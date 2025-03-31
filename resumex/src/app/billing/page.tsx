// import prisma from "@/lib/prisma";
// import { stripe } from "@/lib/stripe";
// import { auth } from "@clerk/nextjs/server";
// import { format } from "date-fns";
// import Stripe from "stripe";
// import Link from "next/link";
//
// // Fetch user subscription
// async function getSubscription(userId: string) {
//   if (!userId) return null;
//
//   return await prisma.userSubscription.findUnique({
//     where: { userId },
//   });
// }
//
// export default async function BillingPage() {
//   const authData = await auth();
//   const userId = authData?.userId;
//
//   if (!userId) {
//     return (
//       <main className="mx-auto max-w-7xl space-y-6 px-3 py-6 text-center">
//         <h1 className="text-3xl font-bold">Billing</h1>
//         <p>You need to log in to access billing details.</p>
//         <Link
//           href="/login"
//           className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition"
//         >
//           Login
//         </Link>
//       </main>
//     );
//   }
//
//   const subscription = await getSubscription(userId);
//
//   let priceInfo = null;
//   if (subscription) {
//     try {
//       priceInfo = await stripe.prices.retrieve(subscription.stripePriceId, {
//         expand: ["product"],
//       });
//     } catch (error) {
//       console.error("Stripe Price Fetch Error:", error);
//     }
//   }
//
//   return (
//     <main className="mx-auto max-w-7xl space-y-6 px-3 py-6">
//       <h1 className="text-3xl font-bold">Billing</h1>
//       <p>
//         Your current plan:{" "}
//         <span className="font-bold">
//           {priceInfo ? (priceInfo.product as Stripe.Product).name : "Free"}
//         </span>
//       </p>
//
//       {subscription ? (
//         <>
//           {subscription.stripeCancelAtPeriodEnd && (
//             <p className="text-red-600">
//               Your subscription will be canceled on{" "}
//               {format(new Date(subscription.stripeCurrentPeriodEnd), "MMMM dd, yyyy")}.
//             </p>
//           )}
//           <Link
//             href="/manage-subscription"
//             className="px-6 py-3 bg-red-600 text-white font-semibold rounded-full shadow-md hover:bg-red-700 hover:shadow-lg transition"
//           >
//             Manage Subscription
//           </Link>
//         </>
//       ) : (
//         <Link
//           href="/pricing"
//           className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 hover:shadow-lg transition"
//         >
//           Get a Subscription
//         </Link>
//       )}
//     </main>
//   );
// }
