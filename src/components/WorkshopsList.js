import React from "react";
import Workshop from "./Workshop";
import loadingGif from "../images/load.gif";
// import { useHttp } from '../hooks/http'
import { localWorkshops } from "../data";

export default function WorkshopsList() {
  // const url = process.env.REACT_APP_BACKEND_HOST + '/workshops'
  // const [isLoading, fetchedData] = useHttp(url, [])
  const isLoading = false;
  const fetchedData = localWorkshops;

  let content = (
    <div className="fetching-spinner container text-center">
      <img src={loadingGif} width="40" height="40" alt="loading..." />
      <p className="mt-3">Loading workshops...</p>
    </div>
  );
  const workshopsList = fetchedData
    ? fetchedData
        .sort((a, b) => {
          // need check fetchedData because it is null on first render because useEffect within useHttp runs after the first render
          const aDate = parseInt(a.startDate.split("-").join(""));
          const bDate = parseInt(b.startDate.split("-").join(""));
          return aDate - bDate;
        })
        .map((workshop) => {
          return (
            <Workshop user key={workshop.secondaryID} workshop={workshop} />
          );
        })
    : [];
  if (!isLoading && fetchedData && fetchedData.length > 0) {
    content = workshopsList;
    // } else if (!isLoading && (!fetchedData || fetchedData.length === 0)) {
    //     content = <p className='my-5'>There are no workshops at the moment</p>
  } else if (!isLoading && !fetchedData) {
    content = <p className="my-5">There was a problem loading workshops</p>;
  } else if (!isLoading && fetchedData.length === 0) {
    content = <p className="my-5">There are no workshops at the moment</p>;
  }
  return <div className="container text-center">{content}</div>;
}
