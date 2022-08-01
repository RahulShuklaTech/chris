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
        style={[styles.Viewaj, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.ViewXT}>
          <View>
            <Text style={[styles.TextrQ, { color: theme.colors.primary }]}>
              {'Social'}
            </Text>

            <Text style={[styles.Textp1, { color: theme.colors.medium }]}>
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
        <Divider style={styles.Dividerta} color={theme.colors.secondary} />
      </View>
      <Spacer top={12} right={8} bottom={12} left={8} />
      <View
        style={[styles.ViewZ3, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.ViewVP}>
          <View
            style={[
              styles.ViewtT,
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
                        styles.ViewbE,
                        {
                          borderRadius: 64,
                          backgroundColor: theme.colors.secondary,
                          borderColor: theme.colors.secondary,
                        },
                      ]}
                    >
                      <Text
                        style={[styles.TextzI, { color: theme.colors.strong }]}
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
                        styles.ViewF3,
                        {
                          borderRadius: 64,
                          borderColor: theme.colors.mediumLight,
                        },
                      ]}
                    >
                      <Text
                        style={[styles.TextSh, { color: theme.colors.strong }]}
                      >
                        {'All'}
                      </Text>
                    </View>
                  </Touchable>
                </View>
              )}
            </>
          </View>

          <View style={styles.ViewY3}>
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
                        styles.ViewYG,
                        {
                          backgroundColor: theme.colors.secondary,
                          borderRadius: 64,
                          borderColor: theme.colors.secondary,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.Textpk,
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
                        styles.ViewZ1,
                        {
                          backgroundColor: theme.colors.custom_rgb244_246_249,
                          borderRadius: 64,
                          borderColor: theme.colors.mediumLight,
                        },
                      ]}
                    >
                      <Text
                        style={[styles.Text_2b, { color: theme.colors.strong }]}
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
        style={styles.ScrollViewW9}
        contentContainerStyle={styles.ScrollViewW9Content}
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
                listKey={'aLSOIH11'}
                keyExtractor={({ item }) => item?.id || item?.uuid || item}
                renderItem={({ item }) => {
                  const listData = item;
                  return (
                    <Surface
                      style={[
                        styles.Surfacey2,
                        {
                          borderRadius: 8,
                          borderColor: theme.colors.mediumLight,
                        },
                      ]}
                      elevation={0}
                    >
                      <View style={styles.Viewgj}>
                        <Text
                          style={[
                            styles.TextDJ,
                            { color: theme.colors.medium },
                          ]}
                        >
                          {listData?.post_category_label}
                        </Text>

                        <Text
                          style={[
                            styles.Textx7,
                            { color: theme.colors.strong },
                          ]}
                        >
                          {listData?.post_text}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.ViewyK,
                          {
                            borderColor: theme.colors.divider,
                            backgroundColor: theme.colors.light,
                          },
                        ]}
                      >
                        <View style={styles.Viewy8}>
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
                              styles.TextyA,
                              { color: theme.colors.medium },
                            ]}
                          >
                            {listData?.post_likes_count}
                            {' likes'}
                          </Text>
                        </View>

                        <View style={styles.Viewdz}>
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
                contentContainerStyle={styles.FlatListaLContent}
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
  TextrQ: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 28,
  },
  Textp1: {
    fontFamily: 'Roboto_400Regular',
  },
  ViewXT: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    alignContent: 'flex-end',
    paddingBottom: 6,
  },
  Dividerta: {
    height: 4,
    width: '10%',
  },
  Viewaj: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  TextzI: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  ViewbE: {
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
  TextSh: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  ViewF3: {
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
  ViewtT: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'center',
  },
  Textpk: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  ViewYG: {
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
  Text_2b: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  ViewZ1: {
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
  ViewY3: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 0,
  },
  ViewVP: {
    flexDirection: 'row',
    paddingTop: 12,
  },
  ViewZ3: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  TextDJ: {
    fontFamily: 'Roboto_400Regular',
  },
  Textx7: {
    marginTop: 8,
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
  },
  Viewgj: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  TextyA: {
    fontFamily: 'Roboto_400Regular',
  },
  Viewy8: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Viewdz: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ViewyK: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    borderTopWidth: 1,
    paddingBottom: 4,
  },
  Surfacey2: {
    minHeight: 40,
    paddingTop: 12,
    marginBottom: 12,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    overflow: 'hidden',
  },
  FlatListaLContent: {
    flex: 1,
  },
  FetchI3: {
    minHeight: 40,
  },
  View_2z: {
    flexShrink: 0,
    flexGrow: 1,
    flex: 1,
  },
  ScrollViewW9: {
    flexGrow: 1,
  },
  ScrollViewW9Content: {
    flexShrink: 0,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 20,
  },
  Text_0M: {
    fontFamily: 'Rubik_700Bold',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
  },
  View_5B: {
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 24,
  },
  ViewXO: {
    flexShrink: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ViewBs: {
    flexGrow: 1,
    flexShrink: 0,
  },
});

export default withTheme(SocialhomeScreen);
