import React, { useContext, useEffect } from "react";
import Workshop from "./Workshop";
import loadingGif from "../images/load.gif";
import { StateContext, DispatchContext } from "../context";
import { GET_REQUEST, GET_SUCCESS, GET_ERROR } from "../ActionTypes";
const baseUrl = process.env.REACT_APP_BACKEND_HOST;

export default function WorkshopsList({ admin, user }) {
  const { workshops, getStatus } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    (async () => {
      dispatch({ type: GET_REQUEST });
      try {
        // throw new Error();

        const req = await fetch(baseUrl + "/workshops", {
          headers: { "Content-Type": "application/json" },
        });
        const data = await req.json();
        dispatch({ type: GET_SUCCESS, payload: data });
      } catch (e) {
        console.log(e);
        dispatch({ type: GET_ERROR });
      }
    })();
  }, []);

  let content;
  if (getStatus === GET_REQUEST) {
    content = (
      <div className="loading-spinner container text-center">
        <img src={loadingGif} width="40" height="40" alt="loading..." />
        <p className="mt-3">Loading workshops...</p>
      </div>
    );
  } else if (getStatus === GET_SUCCESS && workshops.length > 0) {
    content = workshops
      .sort((a, b) => {
        const aDate = parseInt(a.startDate.split("-").join(""));
        const bDate = parseInt(b.startDate.split("-").join(""));
        return aDate - bDate;
      })
      .map((workshop) => {
        return (
          <Workshop
            admin={admin}
            user={user}
            key={workshop._id}
            workshop={workshop}
          />
        );
      });
  } else if (getStatus === GET_SUCCESS && workshops.length === 0) {
    content = <p className="my-5">There are no workshops at the moment</p>;
  } else if (getStatus === GET_ERROR) {
    content = <p className="my-5">There was a problem loading workshops</p>;
  }

  return <div className="container text-center">{content}</div>;
}
