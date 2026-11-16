import Banner from "@/components/Banner";
import ExploreCategories from "@/components/home/ExploreCategories";
import FeaturedEvents from "@/components/home/FeaturedEvents";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import HostEventCta from "@/components/home/HostEventCta";
import FeaturedData from "@/components/home/featureddata";

export default function Home() {
  return (
    <main>
      <Banner />
      <ExploreCategories />
      <FeaturedEvents />
      <UpcomingEvents />
      <HostEventCta />
      <FeaturedData></FeaturedData>
    </main>
  );
}
