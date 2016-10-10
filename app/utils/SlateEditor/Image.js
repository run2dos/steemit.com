import React from 'react'

export default class Image extends React.Component {
    state = {};

    componentDidMount() {
        console.log("** image mounted..", this.state, this.props)
        const { node } = this.props
        const { data } = node
        const file = data.get('file')
        if(file) this.load(file)
    }

    load(file) {
        console.log("** image being loaded.. ----->", file)
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            //this.setState({ src: reader.result })
            const {editor, node} = this.props
            const state = editor.getState();
            const next = state
              .transform()
              .setNodeByKey(node.key, {
                data: {
                  src: reader.result
                }
              })
              .apply()
            editor.onChange(next)
        })
        reader.readAsDataURL(file)
    }

    render() {
        const { node, state, attributes } = this.props
        let { src } = this.state

        const isFocused = state.selection.hasEdgeIn(node)
        const className = isFocused ? 'active' : null

        if(src) {
            console.log("** uploaded image being rendered..", src, state)
        } else {
            const src2 = node.data.get('src')
            console.log("** image source was not in state. data.src = ", src2)
            src = src2;
        }

        if(!src) {
            // src = 'https://img1.steemit.com/0x0/http://ariasprado.name/wp-content/uploads/2012/09/missing-tile-256x256.png'
            // src = $STM_Config.img_proxy_prefix + '0x0/' + src
        }

        return src
          ? <img {...attributes} src={src} className={className} />
          : <span>Loading... ({src})</span>
    }
}
