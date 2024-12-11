"use client";

// components/viewsCount.tsx
import { useEffect, useState } from "react";
import React from "react";

const ViewsCount: React.FC = () => {
  const [sevenDaysViews, sevenDaysViewsDispatch] = useState(0);
  const [thirtyDaysViews, thirtyDaysViewsDispatch] = useState(0);
  const [totalViews, totalViewsDispatch] = useState(0);
  const [siteSevenDaysViews, siteSevenDaysViewsDispatch] = useState(0);
  const [siteThirtyDaysViews, siteThirtyDaysViewsDispatch] = useState(0);
  const [siteTotalViews, siteTotalViewsDispatch] = useState(0);

  useEffect(() => {
    // Don't track views in development,
    // as the api is not available
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    const path = window.location.pathname;
    fetch(`/views?days=7&path=${encodeURIComponent(path)}`)
      .then((response) => response.json())
      .then((data) => {
        sevenDaysViewsDispatch(data.views);
      });

    fetch(`/views?days=30&path=${encodeURIComponent(path)}`)
      .then((response) => response.json())
      .then((data) => {
        thirtyDaysViewsDispatch(data.views);
      });

    fetch(`/views?days=1000&path=${encodeURIComponent(path)}`)
      .then((response) => response.json())
      .then((data) => {
        totalViewsDispatch(data.views);
      });

    fetch(`/views?days=7`)
      .then((response) => response.json())
      .then((data) => {
        siteSevenDaysViewsDispatch(data.views);
      });

    fetch(`/views?days=30`)
      .then((response) => response.json())
      .then((data) => {
        siteThirtyDaysViewsDispatch(data.views);
      });

    fetch(`/views?days=1000`)
      .then((response) => response.json())
      .then((data) => {
        siteTotalViewsDispatch(data.views);
      });
    // }, [router.events]);
  // }, [window.location.pathname]);
  }, []);

  return (
    <div>
      <table className="table-auto">
        <tbody>
          <tr>
            <td className="pr-2">7 Days</td>
            <td className="pr-2">{sevenDaysViews}</td>
            <td className="pr-2">Site 7 Days</td>
            <td className="pr-2">{siteSevenDaysViews}</td>
          </tr>
          <tr>
            <td className="pr-2">30 Days</td>
            <td className="pr-2">{thirtyDaysViews}</td>
            <td className="pr-2">Site 30 Days</td>
            <td className="pr-2">{siteThirtyDaysViews}</td>
          </tr>
          <tr>
            <td className="pr-2">Total</td>
            <td className="pr-2">{totalViews}</td>
            <td className="pr-2">Site Total</td>
            <td className="pr-2">{siteTotalViews}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewsCount;
