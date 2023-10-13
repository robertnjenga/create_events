import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/User';
import connect from '@/utils/db';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      async authorize(credentials) {
        await connect();
        try {
          //Check if the user exists.
          const user = await User.findOne({
            email: credentials.email,
          });

          if (user) {
            // check password
            const isPasswordCorrect = bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error('Wrong Credentials!');
            }
          } else {
            throw new Error('User not found');
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  pages: {
    error: '/dashboard/login',
  },
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ user, account }) {
      if (account.provider === 'google') {
        const { name, email, image } = user;
        try {
          await connect();
          const userExists = await User.findOne({ email });

          if (!userExists) {
            const res = await fetch('/api/auth/user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name,
                email,
                image,
              }),
            });

            if (res.ok) {
              return user;
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
      return user;
    },
  },
  pages: {
    signIn: '/dashboard/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
//   async signIn({ profile }) {
//     try {
//       await connect();

//       const userExists = await User.findOne({ email: profile.email });

//       if (!userExists) {
//         await User.create({
//           email: profile.email,
//           username: profile.name.replace(' ', '').toLowerCase(),
//           image: profile.picture,
//         });
//       }
//       return true;
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   },
//   async session({ session }) {
//     const sessionUser = await User.findOne({
//       email: session.user.email,
//     });

//     session.user.id = sessionUser._id.toString();
//     return session;
//   },

//   pages: {
//     error: '/dashboard/login',
//   },
// });

// const handler = async (req, res) => {
//   return await NextAuth(req, res, {
//     session: {
//       strategy: 'jwt',
//     },
//     providers: [
//       GoogleProvider({
//         clientId: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       }),
//       CredentialsProvider({
//         // async session({ session }) {
//         //   // store the user id from MongoDB to session
//         //   const sessionUser = await User.findOne({ email: session.user.email });
//         //   session.user.id = sessionUser._id.toString();

//         //   return session;
//         // },
//         async authorize(credentials, req) {
//           connect();

//           const { email, password } = credentials;

//           const user = await User.findOne({ email }).select('+password');

//           if (!user) {
//             throw new Error('Invalid Email or Password');
//           }

//           const isPasswordMatched = await bcrypt.compare(
//             password,
//             user.password
//           );

//           if (!isPasswordMatched) {
//             throw new Error('Invalid Email or Password');
//           }

//           return user;
//         },
//       }),
//     ],
//     // callbacks: {
//     //   async session({ session }) {
//     //     // store the user id from MongoDB to session
//     //     const sessionUser = await User.findOne({ email: session.user.email });
//     //     session.user.id = sessionUser._id.toString();

//     //     return session;
//     //   },
//     // },
//     pages: {
//       error: '/dashboard/login',
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//   });
// };

export { handler as GET, handler as POST };
