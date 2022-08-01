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
              listKey={'oJ3nA0jI'}
              keyExtractor={({ item }) => item?.id || item?.uuid || item}
              renderItem={({ item }) => {
                const listData = item;
                return (
                  <>
                    <FlatList
                      data={listData?.fields?.main_image}
                      listKey={'aeJmn0v3'}
                      keyExtractor={({ item }) =>
                        item?.id || item?.uuid || item
                      }
                      renderItem={({ item }) => {
                        const listData = item;
                        return (
                          <View style={styles.Viewm8}>
                            <ImageBackground
                              style={styles.ImageBackgroundSD}
                              source={{
                                uri: `${listData?.thumbnails?.large?.url}`,
                              }}
                              resizeMode={'cover'}
                            />
                          </View>
                        );
                      }}
                      contentContainerStyle={styles.FlatListaeContent}
                      numColumns={1}
                    />
                    <View>
                      <View style={styles.ViewrV}>
                        <Text
                          style={[
                            styles.TextcJ,
                            { color: theme.colors.primary },
                          ]}
                        >
                          {listData?.fields?.category}
                        </Text>
                        <Spacer top={4} right={8} bottom={4} left={8} />
                        <Text
                          style={[
                            styles.Textzw,
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
                          style={styles.Divider_59}
                          color={theme.colors.secondary}
                        />
                        <Spacer right={8} left={8} />
                        <View
                          style={[
                            styles.Viewmb,
                            {
                              backgroundColor: theme.colors.light,
                              borderColor: theme.colors.secondary,
                            },
                          ]}
                        >
                          <View style={styles.ViewzF}>
                            <View
                              style={[
                                styles.View_6T,
                                { backgroundColor: theme.colors.secondary },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.TextGg,
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
                              styles.Textjk,
                              { color: theme.colors.medium },
                            ]}
                          >
                            {listData?.fields?.summary}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.Viewji}>
                        <Text
                          style={[
                            styles.Texto5,
                            { color: theme.colors.medium },
                          ]}
                        >
                          {'Details'}
                        </Text>
                        <Spacer right={8} left={8} top={4} bottom={4} />
                        <Text
                          style={[
                            styles.TextVk,
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
              contentContainerStyle={styles.FlatListoJContent}
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
                  styles.ViewvL,
                  { backgroundColor: theme.colors.lightBackground },
                ]}
              >
                <View>
                  <Text style={[styles.TextaD, { color: theme.colors.medium }]}>
                    {'Prompts'}
                  </Text>
                  <Spacer right={8} left={8} top={4} bottom={4} />
                  <FlatList
                    data={fetchData?.records}
                    listKey={'bdD5xsnm'}
                    keyExtractor={({ item }) => item?.id || item?.uuid || item}
                    renderItem={({ item }) => {
                      const listData = item;
                      return (
                        <>
                          {!listData?.fields?.published_prompt ? null : (
                            <View>
                              <Link
                                style={[
                                  styles.LinkeM,
                                  { color: theme.colors.medium },
                                ]}
                                title={`${listData?.fields?.detail_text}`}
                              />
                              <Divider
                                style={styles.Dividerl2}
                                color={theme.colors.mediumLight}
                              />
                            </View>
                          )}
                        </>
                      );
                    }}
                    contentContainerStyle={styles.FlatListbdContent}
                    numColumns={1}
                  />
                </View>
                <Spacer right={8} left={8} />
                <View>
                  <Text
                    style={[styles.Text_5D, { color: theme.colors.medium }]}
                  >
                    {'Sources'}
                  </Text>
                  <Spacer right={8} left={8} top={4} bottom={4} />
                  <FlatList
                    data={fetchData?.records}
                    listKey={'L6P767C4'}
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
                                  styles.LinkWQ,
                                  {
                                    color: theme.colors.medium,
                                    textDecorationColor: theme.colors.success,
                                  },
                                ]}
                                title={`${listData?.fields?.detail_text}`}
                              />
                              <Divider
                                style={styles.DividerZv}
                                color={theme.colors.mediumLight}
                              />
                            </View>
                          )}
                        </>
                      );
                    }}
                    contentContainerStyle={styles.FlatListL6Content}
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
  ImageBackgroundSD: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  Viewm8: {
    width: '100%',
    height: 200,
  },
  FlatListaeContent: {
    flex: 1,
  },
  TextcJ: {
    fontFamily: 'Roboto_400Regular',
  },
  Textzw: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 22,
    marginBottom: 6,
  },
  Divider_59: {
    height: 4,
    width: '10%',
  },
  TextGg: {
    fontFamily: 'Roboto_500Medium',
    textTransform: 'uppercase',
  },
  View_6T: {
    flexDirection: 'row',
    paddingTop: 2,
    paddingRight: 4,
    paddingBottom: 2,
    paddingLeft: 4,
  },
  ViewzF: {
    flexDirection: 'row',
  },
  Textjk: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 26,
  },
  Viewmb: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    borderTopWidth: 2,
  },
  ViewrV: {
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
  },
  Texto5: {
    fontFamily: 'Roboto_500Medium',
    textTransform: 'uppercase',
  },
  TextVk: {
    lineHeight: 26,
    fontFamily: 'Roboto_400Regular',
    textAlign: 'left',
    fontSize: 14,
  },
  Viewji: {
    paddingLeft: 16,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 16,
  },
  FlatListoJContent: {
    flex: 1,
  },
  TextaD: {
    fontFamily: 'Roboto_500Medium',
    textTransform: 'uppercase',
  },
  LinkeM: {
    fontFamily: 'Roboto_400Regular',
  },
  Dividerl2: {
    height: 1,
    marginTop: 12,
    marginBottom: 12,
  },
  FlatListbdContent: {
    flex: 1,
  },
  Text_5D: {
    fontFamily: 'Roboto_500Medium',
    textTransform: 'uppercase',
  },
  LinkWQ: {
    fontFamily: 'Roboto_400Regular',
    textDecorationLine: 'underline',
  },
  DividerZv: {
    height: 1,
    marginTop: 12,
    marginBottom: 12,
  },
  FlatListL6Content: {
    flex: 1,
  },
  ViewvL: {
    paddingLeft: 16,
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
});

export default withTheme(LearndetailsScreen);
