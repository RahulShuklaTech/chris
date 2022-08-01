import React from 'react';
import * as PublicApi from '../apis/PublicApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Utils from '../utils';
import {
  Divider,
  IconButton,
  ScreenContainer,
  Spacer,
  Surface,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

const JourneyhomeScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

  const isFocused = useIsFocused();
  React.useEffect(async () => {
    try {
      if (!isFocused) {
        return;
      }
      const userJson = await PublicApi.gETUserGET(Constants, {
        user_id: Constants['USER_ID'],
      });
      setGlobalVariableValue({
        key: 'USER_JSON',
        value: userJson,
      });
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.background }}
      hasTopSafeArea={true}
      scrollable={true}
    >
      <View
        style={[styles.ViewnH, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.Viewal}>
          <View>
            <Text style={[styles.TextAL, { color: theme.colors.primary }]}>
              {'Journey'}
            </Text>

            <Text style={[styles.Text_6d, { color: theme.colors.medium }]}>
              {'Keep making progress!!!'}
            </Text>
          </View>
          <IconButton
            onPress={() => {
              try {
                navigation.navigate('BottomTabNavigator', {
                  screen: 'MainNavigator',
                  params: { screen: 'SettingsScreen' },
                });
              } catch (err) {
                console.error(err);
              }
            }}
            size={32}
            icon={'Feather/more-vertical'}
            color={theme.colors.success}
          />
        </View>
        <Divider style={styles.Dividerje} color={theme.colors.secondary} />
      </View>
      <Spacer top={12} right={8} bottom={12} left={8} />
      <View style={styles.View_8Q}>
        <Text style={[styles.TextzL, { color: theme.colors.medium }]}>
          {'Summary'}
        </Text>

        <Surface
          style={[
            styles.Surface_8k,
            { borderRadius: 8, borderColor: theme.colors.mediumLight },
          ]}
        >
          <View style={styles.ViewGn}>
            <Text style={styles.TextAC}>{'Newcomer'}</Text>
          </View>

          <View style={styles.ViewKK}>
            <View>
              <Text style={[styles.Text_5Q, { color: theme.colors.strong }]}>
                {'5'}
              </Text>

              <Text style={[styles.TextkQ, { color: theme.colors.strong }]}>
                {'Day streak'}
              </Text>
            </View>
          </View>

          <View style={styles.ViewZ0}>
            <View>
              <Text style={[styles.TextRI, { color: theme.colors.strong }]}>
                {'0'}
              </Text>

              <Text style={[styles.TextLQ, { color: theme.colors.strong }]}>
                {'Total sessions'}
              </Text>
            </View>
          </View>
        </Surface>
        <Spacer top={12} right={8} bottom={12} left={8} />
        <Text style={[styles.Textdt, { color: theme.colors.medium }]}>
          {'Recent sessions'}
        </Text>

        <Surface
          style={[
            styles.SurfaceW7,
            { borderColor: theme.colors.mediumLight, borderRadius: 8 },
          ]}
        >
          <Utils.CustomCodeErrorBoundary>
            <CustomCode.CalendarComponent />
          </Utils.CustomCodeErrorBoundary>
        </Surface>
        <Spacer top={12} right={8} bottom={12} left={8} />
        <Spacer top={12} right={8} bottom={12} left={8} />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  TextAL: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 28,
  },
  Text_6d: {
    fontFamily: 'Roboto_400Regular',
  },
  Viewal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    alignContent: 'flex-end',
    paddingBottom: 6,
  },
  Dividerje: {
    height: 4,
    width: '10%',
  },
  ViewnH: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  TextzL: {
    fontFamily: 'Roboto_500Medium',
    textTransform: 'uppercase',
  },
  TextAC: {
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular',
    fontSize: 18,
  },
  ViewGn: {
    flex: 1,
  },
  Text_5Q: {
    textAlign: 'center',
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
  },
  TextkQ: {
    textAlign: 'center',
  },
  ViewKK: {
    flex: 1,
  },
  TextRI: {
    textAlign: 'center',
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
  },
  TextLQ: {
    textAlign: 'center',
  },
  ViewZ0: {
    flex: 1,
  },
  Surface_8k: {
    minHeight: 40,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 8,
  },
  Textdt: {
    fontFamily: 'Roboto_500Medium',
    textTransform: 'uppercase',
  },
  SurfaceW7: {
    minHeight: 40,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    marginTop: 8,
    paddingLeft: 8,
    paddingTop: 16,
    paddingRight: 8,
    paddingBottom: 16,
  },
  Textss: {
    fontFamily: 'Roboto_500Medium',
    textTransform: 'uppercase',
  },
  Surface_0y: {
    minHeight: 40,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    marginTop: 8,
    paddingLeft: 8,
    paddingTop: 16,
    paddingRight: 8,
    paddingBottom: 16,
  },
  Text_2H: {
    fontFamily: 'Roboto_500Medium',
    textTransform: 'uppercase',
  },
  Surfacet3: {
    minHeight: 40,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    marginTop: 8,
    paddingLeft: 8,
    paddingTop: 16,
    paddingRight: 8,
    paddingBottom: 16,
  },
  View_8Q: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 10,
  },
});

export default withTheme(JourneyhomeScreen);
