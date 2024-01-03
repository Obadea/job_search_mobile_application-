import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";

const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("search", {
    query: "React developer",
    num_pages: "1",
  });

  const [selectedJob, setSelectedJob] = useState();
  const [visibleItems, setVisibleItems] = useState(4);

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  // const data = [
  //   1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 19, 20, 1, 2, 3, 4, 5,
  //   6, 1, 2, 3, 4,
  // ];

  const handleLoadMore = () => {
    if (visibleItems + 4 <= data.length) {
      // If there are more items to show, increase the count
      setVisibleItems(visibleItems + 3);
    } else {
      // If there are no more items, set visibleItems to the total item count
      setVisibleItems(data.length);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        {data?.length != visibleItems && (
          <TouchableOpacity>
            <Text style={styles.headerBtn} onPress={handleLoadMore}>
              Show more
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text style={{ color: "#fff" }}>Something went wrong</Text>
        ) : (
          <FlatList
            data={data?.slice(0, visibleItems)}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
