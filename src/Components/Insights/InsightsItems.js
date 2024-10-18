import React from "react";
import InsightItem from "./InsightItem";
import formatNumber from "../../helper/numberFormat";

const InsightsItems = ({ insights, toggle }) => {
  const viewCount =
    insights.business_manager?.account_insights_unit
      .aymt_instagram_account_insights_channel || 0;

  const interactionCount =
    insights.business_manager?.account_insights_unit
      .aymt_instagram_account_insights_channel || 0;

  const followerCount = insights.followers_count || 0;

  const storyCount =
    insights.business_manager?.stories_unit.last_week_stories_count || 0;

  return (
    <div className="insights-items">
      <InsightItem title={"views"} count={formatNumber(viewCount)} />
      <InsightItem
        title={"interactions"}
        count={formatNumber(interactionCount)}
      />
      <InsightItem
        title={"total followers"}
        count={formatNumber(followerCount)}
      />
      <InsightItem title={"stories"} count={formatNumber(storyCount)} />
      <InsightItem title={"all posts"} toggle={toggle} />
    </div>
  );
};

export default InsightsItems;
