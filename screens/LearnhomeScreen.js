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
      <View style={styles.Viewer}>
        <View style={styles.ViewAx}>
          <View>
            <Text style={[styles.TextzR, { color: theme.colors.primary }]}>
              {'Learn'}
            </Text>

            <Text style={[styles.TextZP, { color: theme.colors.medium }]}>
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
        <Divider style={styles.DividerrN} color={theme.colors.secondary} />
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
              <View style={styles.Viewhz}>
                <View>
                  <Text
                    style={[styles.TextEu, { color: theme.colors.strong }]}
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
                  listKey={'EpcMkYlI'}
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
                                  styles.View_8T,
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
                                    listKey={'XZGUom5X'}
                                    keyExtractor={({ item }) =>
                                      item?.id || item?.uuid || item
                                    }
                                    renderItem={({ item }) => {
                                      const listData = item;
                                      return (
                                        <Image
                                          style={styles.Imageot}
                                          source={{
                                            uri: `${listData?.thumbnails?.large?.url}`,
                                          }}
                                          resizeMode={'cover'}
                                        />
                                      );
                                    }}
                                    contentContainerStyle={
                                      styles.FlatListXZContent
                                    }
                                    numColumns={1}
                                  />
                                  <View style={styles.Viewrr}>
                                    <Text
                                      style={[
                                        styles.TextR5,
                                        { color: theme.colors.strong },
                                      ]}
                                      numberOfLines={3}
                                      ellipsizeMode={'tail'}
                                    >
                                      {listData?.fields?.title}
                                    </Text>
                                  </View>
                                  <Divider
                                    style={styles.DividerOe}
                                    color={theme.colors.divider}
                                  />
                                  <View
                                    style={[
                                      styles.Viewga,
                                      { backgroundColor: theme.colors.light },
                                    ]}
                                  >
                                    <Text
                                      style={[
                                        styles.Text_4l,
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
                  contentContainerStyle={styles.FlatListEpContent}
                  numColumns={1}
                />
                <Spacer top={16} right={8} bottom={16} left={8} />
              </View>

              <View style={{ backgroundColor: theme.colors.background }}>
                <View style={styles.ViewRN}>
                  <Text
                    style={[styles.Textzt, { color: theme.colors.strong }]}
                    textBreakStrategy={'highQuality'}
                    allowFontScaling={true}
                  >
                    {'ALL LESSONS'}
                  </Text>
                </View>
                <Spacer top={4} bottom={4} />
                <FlatList
                  data={allLessonSummariesData?.records}
                  listKey={'YRk6fQwM'}
                  keyExtractor={({ item }) => item?.id || item?.uuid || item}
                  renderItem={({ item }) => {
                    const listData = item;
                    return (
                      <>
                        <View style={styles.Viewxe}>
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
                                styles.ViewE6,
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
                                  listKey={'0QudyFdv'}
                                  keyExtractor={({ item }) =>
                                    item?.id || item?.uuid || item
                                  }
                                  renderItem={({ item }) => {
                                    const list2Data = item;
                                    return (
                                      <Image
                                        style={styles.Image_5i}
                                        source={{
                                          uri: `${list2Data?.thumbnails?.large?.url}`,
                                        }}
                                        resizeMode={'cover'}
                                      />
                                    );
                                  }}
                                  numColumns={1}
                                />
                                <View style={styles.Viewep}>
                                  <Text
                                    style={[
                                      styles.TextqF,
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
                                    styles.View_3W,
                                    {
                                      backgroundColor: theme.colors.light,
                                      borderColor: theme.colors.divider,
                                    },
                                  ]}
                                >
                                  <View
                                    style={[
                                      styles.ViewPY,
                                      { borderRadius: 64 },
                                    ]}
                                  >
                                    <Text
                                      style={[
                                        styles.TextTc,
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
                  contentContainerStyle={styles.FlatListYRContent}
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
  TextzR: {
    fontSize: 28,
    fontFamily: 'Roboto_700Bold',
  },
  TextZP: {
    fontFamily: 'Roboto_400Regular',
  },
  ViewAx: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 6,
    paddingTop: 20,
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  DividerrN: {
    height: 4,
    width: '10%',
  },
  Viewer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  TextEu: {
    fontFamily: 'Roboto_500Medium',
    textTransform: 'uppercase',
  },
  Imageot: {
    width: '100%',
    height: 250,
  },
  FlatListXZContent: {
    flex: 1,
  },
  TextR5: {
    fontSize: 20,
    fontFamily: 'Roboto_400Regular',
  },
  Viewrr: {
    paddingLeft: 16,
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 12,
  },
  DividerOe: {
    height: 1,
  },
  Text_4l: {
    fontFamily: 'Roboto_400Regular',
  },
  Viewga: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    minHeight: 32,
  },
  View_8T: {
    overflow: 'hidden',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
  FlatListEpContent: {
    flex: 1,
  },
  Viewhz: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  Textzt: {
    fontFamily: 'Roboto_500Medium',
  },
  ViewRN: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  Image_5i: {
    width: '100%',
    height: 160,
  },
  TextqF: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
  },
  Viewep: {
    paddingLeft: 8,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    flex: 1,
  },
  TextTc: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    lineHeight: 12,
  },
  ViewPY: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  View_3W: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 8,
    paddingTop: 6,
    paddingRight: 8,
    paddingBottom: 6,
    borderTopWidth: 1,
  },
  ViewE6: {
    overflow: 'hidden',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
  Viewxe: {
    flex: 1,
    marginBottom: 10,
  },
  FlatListYRContent: {
    flex: 1,
    paddingLeft: 16,
  },
  FetchGj: {
    minHeight: 40,
  },
});

export default withTheme(LearnhomeScreen);
