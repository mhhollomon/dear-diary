import TourView from "~/component/tourView";

export default function Tour() {
   return [
      <title>My Online Diary - Tour</title>,
      <meta property="og:title" content="My Online Diary - Tour" />,
      <meta
         name="description" content="My Online Diary - Tour"
      />,
      <TourView />
   ];
}
