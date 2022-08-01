import React from 'react';
import * as PublicApi from '../apis/PublicApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  Divider,
  Icon,
  IconButton,
  ScreenContainer,
  Spacer,
  Surface,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const SocialhomeScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  // Create postgres filter to add
  const concatFilterString = (field, value) => {
    return '&' + field + '=eq.' + value;
  };

  const { theme } = props;
  const { navigation } = props;

  const pOSTPostsFollowPOST = PublicApi.usePOSTPostsFollowPOST();
  const pATCHStudentSessionPostPATCH =
    PublicApi.usePATCHStudentSessionPostPATCH();
  const dELETEPostsFollowDELETE = PublicApi.useDELETEPostsFollowDELETE();

  const [listExists, setListExists] = React.useState(true);
  const [listMissing, setListMissing] = React.useState(false);
  const [menuTab1, setMenuTab1] = React.useState(true);
  const [menuTab2, setMenuTab2] = React.useState(false);
  const [noContent, setNoContent] = React.useState(false);
  const [postsJson, setPostsJson] = React.useState([]);
  const [returnAllNonUserPosts, setReturnAllNonUserPosts] =
    React.useState(true);
  const [userPostsFilter, setUserPostsFilter] = React.useState('');

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.background }}
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={true}
    >
      <View
        style={[styles.ViewQX, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.ViewW3}>
          <View>
            <Text style={[styles.Textb7, { color: theme.colors.primary }]}>
              {'Social'}
            </Text>

            <Text style={[styles.TextIJ, { color: theme.colors.medium }]}>
              {'Community posts'}
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
        <Divider style={styles.Divider_59} color={theme.colors.secondary} />
      </View>
      <Spacer top={12} right={8} bottom={12} left={8} />
      <View
        style={[styles.ViewBC, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.Viewnf}>
          <View
            style={[
              styles.ViewVP,
              {
                backgroundColor: theme.colors.custom_rgb244_246_249,
                borderTopLeftRadius: 64,
                borderBottomLeftRadius: 64,
              },
            ]}
          >
            <>
              {!menuTab1 ? null : (
                <View>
                  <Touchable
                    onPress={() => {
                      try {
                        setMenuTab1(true);
                        setMenuTab2(false);
                        setListMissing(false);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    <View
                      style={[
                        styles.ViewfU,
                        {
                          borderRadius: 64,
                          backgroundColor: theme.colors.secondary,
                          borderColor: theme.colors.secondary,
                        },
                      ]}
                    >
                      <Text
                        style={[styles.Text_54, { color: theme.colors.strong }]}
                      >
                        {'All'}
                      </Text>
                    </View>
                  </Touchable>
                </View>
              )}
            </>
            <>
              {menuTab1 ? null : (
                <View
                  style={{
                    backgroundColor: theme.colors.custom_rgb244_246_249,
                    borderTopLeftRadius: 64,
                    borderBottomLeftRadius: 64,
                  }}
                >
                  <Touchable
                    onPress={() => {
                      try {
                        setMenuTab1(true);
                        setMenuTab2(false);
                        setListMissing(false);
                        setUserPostsFilter('');
                        setReturnAllNonUserPosts(true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    <View
                      style={[
                        styles.ViewDj,
                        {
                          borderRadius: 64,
                          borderColor: theme.colors.mediumLight,
                        },
                      ]}
                    >
                      <Text
                        style={[styles.Texttu, { color: theme.colors.strong }]}
                      >
                        {'All'}
                      </Text>
                    </View>
                  </Touchable>
                </View>
              )}
            </>
          </View>

          <View style={styles.ViewSw}>
            <>
              {!menuTab2 ? null : (
                <View>
                  <Touchable
                    onPress={() => {
                      try {
                        setMenuTab1(false);
                        setMenuTab2(true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    <View
                      style={[
                        styles.ViewyI,
                        {
                          backgroundColor: theme.colors.secondary,
                          borderRadius: 64,
                          borderColor: theme.colors.secondary,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.Text_4T,
                          { color: theme.colors.custom_rgb255_255_255 },
                        ]}
                      >
                        {'My posts'}
                      </Text>
                    </View>
                  </Touchable>
                </View>
              )}
            </>
            <>
              {menuTab2 ? null : (
                <View
                  style={{
                    backgroundColor: theme.colors.custom_rgb244_246_249,
                  }}
                >
                  <Touchable
                    onPress={() => {
                      try {
                        setMenuTab1(false);
                        setMenuTab2(true);
                        setListMissing(true);
                        const post_filter_string = concatFilterString(
                          'user',
                          Constants['USER_ID']
                        );
                        setUserPostsFilter(post_filter_string);
                        setReturnAllNonUserPosts(false);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    <View
                      style={[
                        styles.Viewex,
                        {
                          backgroundColor: theme.colors.custom_rgb244_246_249,
                          borderRadius: 64,
                          borderColor: theme.colors.mediumLight,
                        },
                      ]}
                    >
                      <Text
                        style={[styles.TextFU, { color: theme.colors.strong }]}
                      >
                        {'My posts'}
                      </Text>
                    </View>
                  </Touchable>
                </View>
              )}
            </>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.ScrollViewWd}
        contentContainerStyle={styles.ScrollViewWdContent}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        <PublicApi.FetchFUNCGetStudentSessionPostsFollowsGET
          return_all={returnAllNonUserPosts}
          type={'Like'}
          user_id={Constants['USER_ID']}
        >
          {({
            loading,
            error,
            data,
            refetchFUNCGetStudentSessionPostsFollows,
          }) => {
            const fetchData = data;
            if (!fetchData || loading) {
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
              <FlatList
                data={fetchData}
                listKey={'mZfFobfl'}
                keyExtractor={({ item }) => item?.id || item?.uuid || item}
                renderItem={({ item }) => {
                  const listData = item;
                  return (
                    <Surface
                      style={[
                        styles.SurfaceVa,
                        {
                          borderRadius: 8,
                          borderColor: theme.colors.mediumLight,
                        },
                      ]}
                      elevation={0}
                    >
                      <View style={styles.ViewqK}>
                        <Text
                          style={[
                            styles.TextZc,
                            { color: theme.colors.medium },
                          ]}
                        >
                          {listData?.post_category_label}
                        </Text>

                        <Text
                          style={[
                            styles.TextR9,
                            { color: theme.colors.strong },
                          ]}
                        >
                          {listData?.post_text}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.ViewAM,
                          {
                            borderColor: theme.colors.divider,
                            backgroundColor: theme.colors.light,
                          },
                        ]}
                      >
                        <View style={styles.ViewvT}>
                          <>
                            {listData?.followed_by_user ? null : (
                              <IconButton
                                onPress={async () => {
                                  try {
                                    await pOSTPostsFollowPOST.mutateAsync({
                                      follow_type: 'Like',
                                      session_id: listData?.id,
                                      user_id: Constants['USER_ID'],
                                    });
                                    await pATCHStudentSessionPostPATCH.mutateAsync(
                                      {
                                        post_likes_count:
                                          listData?.post_likes_count + 1,
                                        session_id: listData?.id,
                                      }
                                    );
                                    await refetchFUNCGetStudentSessionPostsFollows();
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                size={24}
                                icon={'Ionicons/heart-outline'}
                                color={theme.colors.primary}
                              />
                            )}
                          </>
                          <>
                            {!listData?.followed_by_user ? null : (
                              <IconButton
                                onPress={async () => {
                                  try {
                                    await dELETEPostsFollowDELETE.mutateAsync({
                                      follower_user_id: Constants['USER_ID'],
                                      session_id: listData?.id,
                                    });
                                    await pATCHStudentSessionPostPATCH.mutateAsync(
                                      {
                                        post_likes_count:
                                          listData?.post_likes_count - 1,
                                        session_id: listData?.id,
                                      }
                                    );
                                    await refetchFUNCGetStudentSessionPostsFollows();
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                size={24}
                                icon={'Ionicons/heart'}
                                color={theme.colors.primary}
                              />
                            )}
                          </>
                          <Text
                            style={[
                              styles.Textz1,
                              { color: theme.colors.medium },
                            ]}
                          >
                            {listData?.post_likes_count}
                            {' likes'}
                          </Text>
                        </View>

                        <View style={styles.ViewAW}>
                          <IconButton
                            size={24}
                            icon={'Ionicons/flag-outline'}
                            color={theme.colors.mediumLight}
                          />
                        </View>
                      </View>
                    </Surface>
                  );
                }}
                contentContainerStyle={styles.FlatListmZContent}
                numColumns={1}
              />
            );
          }}
        </PublicApi.FetchFUNCGetStudentSessionPostsFollowsGET>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Textb7: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 28,
  },
  TextIJ: {
    fontFamily: 'Roboto_400Regular',
  },
  ViewW3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    alignContent: 'flex-end',
    paddingBottom: 6,
  },
  Divider_59: {
    height: 4,
    width: '10%',
  },
  ViewQX: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  Text_54: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  ViewfU: {
    paddingTop: 9,
    paddingBottom: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 9,
    paddingRight: 9,
    flexGrow: 0,
    flexShrink: 0,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  Texttu: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  ViewDj: {
    paddingTop: 9,
    paddingBottom: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 9,
    paddingRight: 9,
    flexGrow: 0,
    flexShrink: 0,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  ViewVP: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'center',
  },
  Text_4T: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  ViewyI: {
    paddingTop: 9,
    paddingBottom: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 9,
    paddingRight: 9,
    flexGrow: 0,
    flexShrink: 0,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  TextFU: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  Viewex: {
    paddingTop: 9,
    paddingBottom: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 9,
    paddingRight: 9,
    flexGrow: 0,
    flexShrink: 0,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  ViewSw: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 0,
  },
  Viewnf: {
    flexDirection: 'row',
    paddingTop: 12,
  },
  ViewBC: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  TextZc: {
    fontFamily: 'Roboto_400Regular',
  },
  TextR9: {
    marginTop: 8,
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
  },
  ViewqK: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  Textz1: {
    fontFamily: 'Roboto_400Regular',
  },
  ViewvT: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewAW: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ViewAM: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    borderTopWidth: 1,
    paddingBottom: 4,
  },
  SurfaceVa: {
    minHeight: 40,
    paddingTop: 12,
    marginBottom: 12,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    overflow: 'hidden',
  },
  FlatListmZContent: {
    flex: 1,
  },
  FetchaC: {
    minHeight: 40,
  },
  Viewdk: {
    flexShrink: 0,
    flexGrow: 1,
    flex: 1,
  },
  ScrollViewWd: {
    flexGrow: 1,
  },
  ScrollViewWdContent: {
    flexShrink: 0,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 20,
  },
  TextWX: {
    fontFamily: 'Rubik_700Bold',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
  },
  Viewvg: {
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 24,
  },
  ViewwY: {
    flexShrink: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Viewcd: {
    flexGrow: 1,
    flexShrink: 0,
  },
});

export default withTheme(SocialhomeScreen);
