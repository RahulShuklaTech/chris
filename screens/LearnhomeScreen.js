import React from 'react';
import * as AirtableLessonPagesApi from '../apis/AirtableLessonPagesApi.js';
import * as PublicApi from '../apis/PublicApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  Divider,
  Icon,
  IconButton,
  ScreenContainer,
  Spacer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const LearnhomeScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

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
      const lessonLabelCurrent = userJson[0]['lesson_label_current'];
      setLESSON_LABEL_CURRENT(lessonLabelCurrent);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [LESSON_LABEL_CURRENT, setLESSON_LABEL_CURRENT] = React.useState('-');

  return (
    <ScreenContainer
      style={{ borderRadius: 12, backgroundColor: theme.colors.background }}
      scrollable={true}
      hasSafeArea={false}
      hasTopSafeArea={true}
    >
      <View style={styles.ViewJa}>
        <View style={styles.Viewrr}>
          <View>
            <Text style={[styles.Text_8e, { color: theme.colors.primary }]}>
              {'Learn'}
            </Text>

            <Text style={[styles.TextDH, { color: theme.colors.medium }]}>
              {'Lesson summaries'}
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
            color={theme.colors.success}
            icon={'Feather/more-vertical'}
          />
        </View>
        <Divider style={styles.DividerkM} color={theme.colors.secondary} />
      </View>
      <Spacer top={12} right={8} bottom={12} left={8} />
      <AirtableLessonPagesApi.FetchGETLessonSummariesGET>
        {({ loading, error, data, refetchGETLessonSummaries }) => {
          const allLessonSummariesData = data;
          if (!allLessonSummariesData || loading) {
            return <ActivityIndicator />;
          }

          if (error) {
            return (
              <Text style={{ textAlign: 'center' }}>
                There was a problem fetching this data
              </Text>
            );
          }

          return (
            <>
              <View style={styles.ViewNr}>
                <View>
                  <Text
                    style={[styles.Text_9H, { color: theme.colors.strong }]}
                    ellipsizeMode={'tail'}
                    textBreakStrategy={'highQuality'}
                    allowFontScaling={true}
                  >
                    {'Current lesson'}
                  </Text>
                </View>
                <Spacer top={4} bottom={4} />
                <FlatList
                  data={allLessonSummariesData?.records}
                  listKey={'OCBxrYb9'}
                  keyExtractor={({ item }) => item?.id || item?.uuid || item}
                  renderItem={({ item }) => {
                    const listData = item;
                    return (
                      <>
                        {!(
                          listData?.fields?.lesson_label_id ===
                          LESSON_LABEL_CURRENT
                        ) ? null : (
                          <View>
                            <Touchable
                              onPress={() => {
                                try {
                                  navigation.navigate('LearndetailsScreen', {
                                    lesson_label_id:
                                      listData?.fields?.lesson_label_id,
                                    lesson_summary: listData?.fields,
                                  });
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <View
                                style={[
                                  styles.Viewl0,
                                  {
                                    borderRadius: 8,
                                    borderColor: theme.colors.mediumLight,
                                    backgroundColor: theme.colors.surface,
                                  },
                                ]}
                              >
                                <View>
                                  <FlatList
                                    data={listData?.fields?.main_image}
                                    listKey={'n3XEaPwD'}
                                    keyExtractor={({ item }) =>
                                      item?.id || item?.uuid || item
                                    }
                                    renderItem={({ item }) => {
                                      const listData = item;
                                      return (
                                        <Image
                                          style={styles.ImageKM}
                                          source={{
                                            uri: `${listData?.thumbnails?.large?.url}`,
                                          }}
                                          resizeMode={'cover'}
                                        />
                                      );
                                    }}
                                    contentContainerStyle={
                                      styles.FlatListn3Content
                                    }
                                    numColumns={1}
                                  />
                                  <View style={styles.Viewvy}>
                                    <Text
                                      style={[
                                        styles.TextgT,
                                        { color: theme.colors.strong },
                                      ]}
                                      numberOfLines={3}
                                      ellipsizeMode={'tail'}
                                    >
                                      {listData?.fields?.title}
                                    </Text>
                                  </View>
                                  <Divider
                                    style={styles.Dividerze}
                                    color={theme.colors.divider}
                                  />
                                  <View
                                    style={[
                                      styles.ViewO2,
                                      { backgroundColor: theme.colors.light },
                                    ]}
                                  >
                                    <Text
                                      style={[
                                        styles.Textjk,
                                        { color: theme.colors.medium },
                                      ]}
                                    >
                                      {listData?.fields?.category}
                                    </Text>
                                    <IconButton
                                      icon={'Feather/more-vertical'}
                                      size={24}
                                      color={theme.colors.mediumLight}
                                    />
                                  </View>
                                </View>
                              </View>
                            </Touchable>
                          </View>
                        )}
                      </>
                    );
                  }}
                  contentContainerStyle={styles.FlatListOCContent}
                  numColumns={1}
                />
                <Spacer top={16} right={8} bottom={16} left={8} />
              </View>

              <View style={{ backgroundColor: theme.colors.background }}>
                <View style={styles.View_8c}>
                  <Text
                    style={[styles.Textzg, { color: theme.colors.strong }]}
                    textBreakStrategy={'highQuality'}
                    allowFontScaling={true}
                  >
                    {'ALL LESSONS'}
                  </Text>
                </View>
                <Spacer top={4} bottom={4} />
                <FlatList
                  data={allLessonSummariesData?.records}
                  listKey={'QNq8JYZ9'}
                  keyExtractor={({ item }) => item?.id || item?.uuid || item}
                  renderItem={({ item }) => {
                    const listData = item;
                    return (
                      <>
                        <View style={styles.ViewUc}>
                          <Touchable
                            onPress={() => {
                              try {
                                navigation.navigate('LearndetailsScreen', {
                                  lesson_summary: listData?.fields,
                                  lesson_label_id:
                                    listData?.fields?.lesson_label_id,
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <View
                              style={[
                                styles.ViewUv,
                                {
                                  borderRadius: 8,
                                  borderColor: theme.colors.mediumLight,
                                  backgroundColor: theme.colors.surface,
                                },
                              ]}
                            >
                              <View>
                                <FlatList
                                  data={listData?.fields?.main_image}
                                  listKey={'OyOdQNia'}
                                  keyExtractor={({ item }) =>
                                    item?.id || item?.uuid || item
                                  }
                                  renderItem={({ item }) => {
                                    const list2Data = item;
                                    return (
                                      <Image
                                        style={styles.ImageBz}
                                        source={{
                                          uri: `${list2Data?.thumbnails?.large?.url}`,
                                        }}
                                        resizeMode={'cover'}
                                      />
                                    );
                                  }}
                                  numColumns={1}
                                />
                                <View style={styles.Viewaq}>
                                  <Text
                                    style={[
                                      styles.Textya,
                                      { color: theme.colors.strong },
                                    ]}
                                    numberOfLines={4}
                                    ellipsizeMode={'tail'}
                                  >
                                    {listData?.fields?.title}
                                  </Text>
                                </View>

                                <View
                                  style={[
                                    styles.ViewMH,
                                    {
                                      backgroundColor: theme.colors.light,
                                      borderColor: theme.colors.divider,
                                    },
                                  ]}
                                >
                                  <View
                                    style={[
                                      styles.ViewUe,
                                      { borderRadius: 64 },
                                    ]}
                                  >
                                    <Text
                                      style={[
                                        styles.Textts,
                                        { color: theme.colors.medium },
                                      ]}
                                    >
                                      {listData?.fields?.category}
                                    </Text>
                                  </View>
                                  <Icon
                                    size={18}
                                    name={'Feather/more-vertical'}
                                    color={theme.colors.mediumLight}
                                  />
                                </View>
                              </View>
                            </View>
                          </Touchable>
                        </View>
                        <Spacer top={10} right={8} left={8} />
                      </>
                    );
                  }}
                  contentContainerStyle={styles.FlatListQNContent}
                  numColumns={2}
                />
              </View>
            </>
          );
        }}
      </AirtableLessonPagesApi.FetchGETLessonSummariesGET>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Text_8e: {
    fontSize: 28,
    fontFamily: 'Roboto_700Bold',
  },
  TextDH: {
    fontFamily: 'Roboto_400Regular',
  },
  Viewrr: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 6,
    paddingTop: 20,
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  DividerkM: {
    height: 4,
    width: '10%',
  },
  ViewJa: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  Text_9H: {
    fontFamily: 'Roboto_500Medium',
    textTransform: 'uppercase',
  },
  ImageKM: {
    width: '100%',
    height: 250,
  },
  FlatListn3Content: {
    flex: 1,
  },
  TextgT: {
    fontSize: 20,
    fontFamily: 'Roboto_400Regular',
  },
  Viewvy: {
    paddingLeft: 16,
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 12,
  },
  Dividerze: {
    height: 1,
  },
  Textjk: {
    fontFamily: 'Roboto_400Regular',
  },
  ViewO2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    minHeight: 32,
  },
  Viewl0: {
    overflow: 'hidden',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
  FlatListOCContent: {
    flex: 1,
  },
  ViewNr: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  Textzg: {
    fontFamily: 'Roboto_500Medium',
  },
  View_8c: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  ImageBz: {
    width: '100%',
    height: 160,
  },
  Textya: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
  },
  Viewaq: {
    paddingLeft: 8,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    flex: 1,
  },
  Textts: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    lineHeight: 12,
  },
  ViewUe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ViewMH: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 8,
    paddingTop: 6,
    paddingRight: 8,
    paddingBottom: 6,
    borderTopWidth: 1,
  },
  ViewUv: {
    overflow: 'hidden',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
  ViewUc: {
    flex: 1,
    marginBottom: 10,
  },
  FlatListQNContent: {
    flex: 1,
    paddingLeft: 16,
  },
  FetchYb: {
    minHeight: 40,
  },
});

export default withTheme(LearnhomeScreen);
