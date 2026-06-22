import { HomeVideoBanner } from "@/components/home/HomeVideoBanner";
import { HomeBestProducts } from "@/components/home/HomeBestProducts";
import { HomeProductGrid } from "@/components/home/HomeProductGrid";
import { HomeEditorial } from "@/components/home/HomeEditorial";
import { HomeCollections } from "@/components/home/HomeCollections";
import { HomeReviews } from "@/components/home/HomeReviews";
import { HomeWholesale } from "@/components/home/HomeWholesale";
import { TrustBar } from "@/components/shop/TrustBar";
import { bowlzProducts, bongzProducts } from "@/data/content";

export default function HomePage() {
  return (
    <>
      <HomeVideoBanner />
      <HomeBestProducts
        id="bowlz"
        title="Bowlz"
        products={bowlzProducts.slice(0, 4)}
        seeAllHref="/shop/bowlz"
        seeAllLabel="Shop All Bowlz"
        showSwatches
      />
      <TrustBar />
      <HomeProductGrid
        id="bongz"
        title="Bongz"
        products={bongzProducts.slice(0, 4)}
        seeAllHref="/shop/bongz"
        seeAllLabel="Shop All Bongz"
        layout="carousel"
      />
      <HomeEditorial />
      <HomeCollections />
      <HomeReviews />
      <HomeWholesale />
    </>
  );
}
