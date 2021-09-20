import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAuth} from '../hooks/useAuth';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useGetObservationsByUserQuery} from '../services/mushroomObserver';

const NoObservations = () => (
  <View style={styles.noObservations}>
    <Icon name="eye-slash" size={50} color="gray" />
    <Text style={styles.noObservationsLabel}>No Observations</Text>
  </View>
);

const Observation = ({item}) => {
  return (
    <TouchableOpacity style={styles.observation}>
      <Image
        style={styles.observationImage}
        width={90}
        height={90}
        resizeMethod="scale"
        source={{
          uri: `https://mushroomobserver.org/images/thumb/${item.primary_image?.id}.jpg`,
        }}
      />
      <View>
        <View>
          <Text>#{item.id}</Text>
          <Text>{item.date}</Text>
        </View>
        <View>
          <Text>{item.consensus?.name}</Text>
          <Text>{item.consensus?.author}</Text>
        </View>
        <Text>{item.location?.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ListObservations = () => {
  const auth = useAuth();
  const {data, isLoading} = useGetObservationsByUserQuery(auth);
  return (
    <View style={styles.container}>
      <FlatList
        data={data?.results}
        refreshing={isLoading}
        ListEmptyComponent={NoObservations}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({item}) => <Observation item={item} />}
        keyExtractor={item => item?.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noObservations: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noObservationsLabel: {
    margin: 5,
    color: 'gray',
    fontSize: 16,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  observation: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  observationImage: {
    width: 50,
    height: 50,
  },
});

export default ListObservations;
