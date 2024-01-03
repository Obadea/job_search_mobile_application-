import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";

const Nearbyjobs = () => {
  const [visibleItems, setVisibleItems] = useState(9);

  const router = useRouter();
  const { data, isLoading, error } = useFetch("search", {
    query: "Frontend Developer, Nigeria",
    num_pages: "1",
  });

  // const data = [
  //   1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 19, 20, 1, 2, 3, 4, 5,
  //   6, 1, 2, 3, 4,
  // ];

  const handleLoadMore = () => {
    if (visibleItems + 9 <= data.length) {
      // If there are more items to show, increase the count
      setVisibleItems(visibleItems + 5);
    } else {
      // If there are no more items, set visibleItems to the total item count
      setVisibleItems(data.length);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        {data.length != visibleItems && (
          <TouchableOpacity onPress={handleLoadMore}>
            <Text style={styles.headerBtn}>Show more</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text style={{ color: "#fff" }}>Something went wrong</Text>
        ) : (
          data
            ?.slice(0, visibleItems)
            ?.map((job) => (
              <NearbyJobCard
                job={job}
                key={`nearby-job-${job.job_id}`}
                handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
              />
            ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
