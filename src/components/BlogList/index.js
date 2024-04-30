// Write your JS code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'
import './index.css'

class BlogList extends Component {
  state = {blogsData: [], isloading: true}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const responsen = await fetch('https://apis.ccbp.in/blogs')
    const data = await responsen.json()
    const fromatedData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))
    this.setState({blogsData: fromatedData, isloading: false})
  }

  render() {
    const {blogsData, isloading} = this.state

    return (
      <div className="blogs-list-container">
        {isloading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          <ul className="blogs-list">
            {blogsData.map(eachBlogsItem => (
              <BlogItem
                key={eachBlogsItem.id}
                blogItemDetails={eachBlogsItem}
              />
            ))}
          </ul>
        )}
      </div>
    )
  }
}
export default BlogList
