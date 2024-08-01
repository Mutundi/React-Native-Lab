import { Tabs } from "expo-router";
import TabBar from '../components/TabBar';

export default function RootLayout() {
  return (
    <Tabs
      tabBar={props => <TabBar {...props} />}
    >
      <Tabs.Screen 
        name="index"
        options={{
          title: 'Home'
        }}
      />
      <Tabs.Screen 
        name="profile"
        options={{
          title: 'Profile'
        }}
      />
      <Tabs.Screen 
        name="explore"
        options={{
          title: 'Explore'
        }}
      />
      <Tabs.Screen 
        name="create"
        options={{
          title: 'Create'
        }}
      />
    </Tabs>
  );
}
