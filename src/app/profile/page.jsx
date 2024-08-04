// src/app/profile/page.tsx
import { wixClientServer } from "@/lib/wixClientServer";
import { members } from "@wix/members";
import ProfileDetails from "@/components/ProfileDetails";
import OrdersList from "@/components/OrderList";

const ProfilePage = async () => {
  const wixClient = await wixClientServer();
  let user;
  let orders = [];

  try {
    user = await wixClient.members.getCurrentMember({
      fieldsets: [members.Set.FULL],
    });

    if (user.member?.contactId) {
      const orderRes = await wixClient.orders.searchOrders({
        search: {
          filter: { "buyerInfo.contactId": { $eq: user.member?.contactId } },
        },
      });

      orders = orderRes.orders.map(order => ({
        _id: order._id ?? '',
        priceSummary: order.priceSummary ?? { subtotal: { amount: 0 } },
        _createdDate: order._createdDate,
        status: order.status,
      }));
    }
  } catch (error) {
    console.error('Error fetching user or orders:', error);
  }

  if (!user?.member?.contactId) {
    return <div className="">Not logged in!</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-24 md:h-[calc(100vh-180px)] items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <ProfileDetails user={user} />
      <OrdersList orders={orders} />
    </div>
  );
};

export default ProfilePage;
