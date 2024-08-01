import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';

const TabBar = ({ state, descriptors, navigation }) => {

  const icons = {
    index: (props) => <Feather name="home" size={26} color={greyColor} {...props} />,
    profile: (props) => <Feather name="user" size={26} color={greyColor} {...props} />,
    explore: (props) => <Feather name="compass" size={26} color={greyColor} {...props} />,
    create: (props) => <Feather name="plus-circle" size={26} color={greyColor} {...props} />,
  };

  const primaryColor = '#32CD32';
  const greyColor = '#737373';

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        if(['_sitemap', '+not-found'].includes(route.name)) return null;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            {
              icons[route.name]({
                color: isFocused ? primaryColor : greyColor,
              })
            }
            <Text style={{ 
              color: isFocused ? primaryColor : greyColor,
              fontSize: 12
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 18,
    paddingVertical: 20,
    borderRadius: 25,
    fontSize: 10,
    borderCurve: 'continuous',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  }
})

export default TabBar