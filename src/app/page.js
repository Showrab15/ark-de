
import BannerSlider from "@/components/Banner";
import CollectionsSection from "@/components/Collections";
import FabricStories from "@/components/FabricPost";

export const metadata = {
  title: "Home",
  description: "For The Few",
};

export default function App() {

  return (
    <>
    <BannerSlider/>
      <CollectionsSection />
      <FabricStories />
    </>
  );
}