import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

export const useNotifications = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.notifications);

  useEffect(() => {
    const fetchStoredNotifications = async () => {
      const storedNotifications = await AsyncStorage.getItem('notifications');
      if (storedNotifications) {
        const parsedNotifications = JSON.parse(storedNotifications);
        console.log('Loaded notifications from AsyncStorage:', parsedNotifications);
        dispatch(loadStoredNotifications(parsedNotifications));
      }
    };

    fetchStoredNotifications();
    dispatch(fetchNotifications());
  }, [dispatch]);

  return { data, isLoading, error };
};
