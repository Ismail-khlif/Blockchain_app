import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';

const API_KEY ='AIzaSyDZ015-eR8O2rOfRgwB7Dp62GiUohXxR9w'; 

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      videos : [],
      selectedVideo:null
    };

    //YTSearch({key:API_KEY,term:'surfboards'},(data)=>{
      //this.setState({videos:data});  /////// same code as below

      this.videoSearch('surfboards');
  }

  videoSearch(term){
    YTSearch({key:API_KEY,term:term},(videos)=>{
      this.setState({
        videos:videos,
        selectedVideo: videos[0]
      });
  });
  }


  render(){
    const videoSearch = _.debounce((term)=>{this.videoSearch(term)},300);
    return (
    <div>
      <SearchBar onSearchTermChange={term=>this.videoSearch(term)}/>
      <VideoDetail video={this.state.selectedVideo}/>
      <VideoList 
      onVideoSelect={selectedVideo=>this.setState({selectedVideo})}
      videos={this.state.videos}  />
      
    </div>);
  }

}

ReactDOM.render(<App />,document.querySelector('.container'));


/*--------------------------------------------------------------------------------------
const API_KEY ='AIzaSyDZ015-eR8O2rOfRgwB7Dp62GiUohXxR9w';

YTSearch({key:API_KEY,term:'surfboards'},function(data){
    console.log(data);
});

const App = () =>{
  return <div>
    <SearchBar />
  </div>;
}

ReactDOM.render(<App />,document.querySelector('.container'));
*/

/*--------------------------------------------------------------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));

*/
