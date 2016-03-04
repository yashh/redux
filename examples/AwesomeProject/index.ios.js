/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  ListView,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';


class AwesomeProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    }
  }
  
  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true
        })
      }).done()
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView()
    }
    return (
      <ListView dataSource={this.state.dataSource}
                renderRow={this.renderMovie}
                style={styles.listView}>
      </ListView>
    )
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading movies...</Text>
      </View>
    )
  }

  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image source={{uri:movie.posters.thumbnail}} style={styles.thumbnail} />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F5FCFF'
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  rightContainer: {
    flex: 1
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 20
  },
  year: {
    textAlign: 'center'
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
