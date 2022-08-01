import React from 'react';
import * as AirtableLessonPagesApi from '../apis/AirtableLessonPagesApi.js';
import {
  Divider,
  Link,
  ScreenContainer,
  Spacer,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const LearndetailsScreen = props => {
  const { theme } = props;

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={true}
      hasTopSafeArea={false}
    >
      <AirtableLessonPagesApi.FetchGETONELessonSummaryGET
        method={'GET'}
        lesson_label_id={
          props.route?.params?.lesson_label_id ?? 'growth_mindset'
        }
      >
        {({ loading, error, data, refetchGETONELessonSummary }) => {
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
              data={fetchData?.records}
              listKey={'84upNEEE'}
              keyExtractor={({ item }) => item?.id || item?.uuid || item}
              renderItem={({ item }) => {
                const listData = item;
                return (
                  <>
                    <FlatList
                      data={listData?.fields?.main_image}
                      listKey={'zpPkfYuf'}
                      keyExtractor={({ item }) =>
                        item?.id || item?.uuid || item
                      }
                      renderItem={({ item }) => {
                        const listData = item;
                        return (
                          <View style={styles.View_73}>
                            <ImageBackground
                              style={styles.ImageBackgroundLe}
                              source={{
                                uri: `${listData?.thumbnails?.large?.url}`,
                              }}
                              resizeMode={'cover'}
                            />
                          </View>
                        );
                      }}
                      contentContainerStyle={styles.FlatListzpContent}
                      numColumns={1}
                    />
                    <View>
                      <View style={styles.ViewjT}>
                        <Text
                          style={[
                            styles.Text_9X,
                            { color: theme.colors.primary },
                          ]}
                        >
                          {listData?.fields?.category}
                        </Text>
                        <Spacer top={4} right={8} bottom={4} left={8} />
                        <Text
                          style={[
                            styles.TextAo,
                            { color: theme.colors.strong },
                          ]}
                          textBreakStrategy={'highQuality'}
                          ellipsizeMode={'head'}
                          allowFontScaling={true}
                          numberOfLines={4}
                        >
                          {listData?.fields?.title}
                        </Text>
                        <Divider
                          style={styles.Dividerm2}
                          color={theme.colors.secondary}
                        />
                        <Spacer right={8} left={8} />
                        <View
                          style={[
                            styles.ViewMR,
                            {
                              backgroundColor: theme.colors.light,
                              borderColor: theme.colors.secondary,
                            },
                          ]}
                        >
                          <View style={styles.ViewxZ}>
                            <View
                              style={[
                                styles.View_5D,
                                { backgroundColor: theme.colors.secondary },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.Text_4R,
                                  { color: theme.colors.strong },
                                ]}
                              >
                                {'Summary'}
                              </Text>
                            </View>
                            <View />
                          </View>

                          <Text
                            style={[
                              styles.Texta2,
                              { color: theme.colors.medium },
                            ]}
                          >
                            {listData?.fields?.summary}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.View_6L}>
                        <Text
                          style={[
                            styles.Text_9b,
                            { color: theme.colors.medium },
                          ]}
                        >
                          {'Details'}
                        </Text>
                        <Spacer right={8} left={8} top={4} bottom={4} />
                        <Text
                          style={[
                            styles.TextHT,
                            { color: theme.colors.medium },
                          ]}
                        >
                          {listData?.fields?.details}
                        </Text>
                      </View>
                    </View>
                  </>
                );
              }}
              contentContainerStyle={styles.FlatList_84Content}
              numColumns={1}
            />
          );
        }}
      </AirtableLessonPagesApi.FetchGETONELessonSummaryGET>
      <AirtableLessonPagesApi.FetchGETLessonDetailsGET
        method={'GET'}
        lesson_label_id={
          props.route?.params?.lesson_label_id ?? 'growth_mindset'
        }
      >
        {({ loading, error, data, refetchGETLessonDetails }) => {
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
            <View>
              <View
                style={[
                  styles.Viewx9,
                  { backgroundColor: theme.colors.lightBackground },
                ]}
              >
                <View>
                  <Text style={[styles.TextsI, { color: theme.colors.medium }]}>
                    {'Prompts'}
                  </Text>
                  <Spacer right={8} left={8} top={4} bottom={4} />
                  <FlatList
                    data={fetchData?.records}
                    listKey={'5ooeKR68'}
                    keyExtractor={({ item }) => item?.id || item?.uuid || item}
                    renderItem={({ item }) => {
                      const listData = item;
                      return (
                        <>
                          {!listData?.fields?.published_prompt ? null : (
                            <View>
                              <Link
                                style={[
                                  styles.LinkOL,
                                  { color: theme.colors.medium },
                                ]}
                                title={`${listData?.fields?.detail_text}`}
                              />
                              <Divider
                                style={styles.Divider_1k}
                                color={theme.colors.mediumLight}
                              />
                            </View>
                          )}
                        </>
                      );
                    }}
                    contentContainerStyle={styles.FlatList_5oContent}
                    numColumns={1}
                  />
                </View>
                <Spacer right={8} left={8} />
                <View>
                  <Text
                    style={[styles.Text_96, { color: theme.colors.medium }]}
                  >
                    {'Sources'}
                  </Text>
                  <Spacer right={8} left={8} top={4} bottom={4} />
                  <FlatList
                    data={fetchData?.records}
                    listKey={'t1Ljgka0'}
                    keyExtractor={({ item }) => item?.id || item?.uuid || item}
                    renderItem={({ item }) => {
                      const listData = item;
                      return (
                        <>
                          {!listData?.fields?.published_source ? null : (
                            <View>
                              <Link
                                onPress={async () => {
                                  try {
                                    await WebBrowser.openBrowserAsync(
                                      `${listData?.fields?.url}`
                                    );
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                style={[
                                  styles.Linkzb,
                                  {
                                    color: theme.colors.medium,
                                    textDecorationColor: theme.colors.success,
                                  },
                                ]}
                                title={`${listData?.fields?.detail_text}`}
                              />
                              <Divider
                                style={styles.Divider_4a}
                                color={theme.colors.mediumLight}
                              />
                            </View>
                          )}
                        </>
                      );
                    }}
                    contentContainerStyle={styles.FlatListt1Content}
                    numColumns={1}
                  />
                </View>
              </View>
            </View>
          );
        }}
      </AirtableLessonPagesApi.FetchGETLessonDetailsGET>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ImageBackgroundLe: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  View_73: {
    width: '100%',
    height: 200,
  },
  FlatListzpContent: {
    flex: 1,
  },
  Text_9X: {
    fontFamily: 'Roboto_400Regular',
  },
  TextAo: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 22,
    marginBottom: 6,
  },
  Dividerm2: {
    height: 4,
    width: '10%',
  },
  Text_4R: {
    fontFamily: 'Roboto_500Medium',
    textTransform: 'uppercase',
  },
  View_5D: {
    flexDirection: 'row',
    paddingTop: 2,
    paddingRight: 4,
    paddingBottom: 2,
    paddingLeft: 4,
  },
  ViewxZ: {
    flexDirection: 'row',
  },
  Texta2: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 26,
  },
  ViewMR: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    borderTopWidth: 2,
  },
  ViewjT: {
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
  },
  Text_9b: {
    fontFamily: 'Roboto_500Medium',
    textTransform: 'uppercase',
  },
  TextHT: {
    lineHeight: 26,
    fontFamily: 'Roboto_400Regular',
    textAlign: 'left',
    fontSize: 14,
  },
  View_6L: {
    paddingLeft: 16,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 16,
  },
  FlatList_84Content: {
    flex: 1,
  },
  TextsI: {
    fontFamily: 'Roboto_500Medium',
    textTransform: 'uppercase',
  },
  LinkOL: {
    fontFamily: 'Roboto_400Regular',
  },
  Divider_1k: {
    height: 1,
    marginTop: 12,
    marginBottom: 12,
  },
  FlatList_5oContent: {
    flex: 1,
  },
  Text_96: {
    fontFamily: 'Roboto_500Medium',
    textTransform: 'uppercase',
  },
  Linkzb: {
    fontFamily: 'Roboto_400Regular',
    textDecorationLine: 'underline',
  },
  Divider_4a: {
    height: 1,
    marginTop: 12,
    marginBottom: 12,
  },
  FlatListt1Content: {
    flex: 1,
  },
  Viewx9: {
    paddingLeft: 16,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
});

export default withTheme(LearndetailsScreen);
