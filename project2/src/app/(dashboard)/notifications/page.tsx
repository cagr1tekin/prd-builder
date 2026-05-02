import { Header } from "@/shared/components/Header";
import { NotificationsList } from "@/features/notifications/components/NotificationsList";

export default function NotificationsPage() {
  return (
    <>
      <Header title="Bildirimler" />
      <NotificationsList />
    </>
  );
}
