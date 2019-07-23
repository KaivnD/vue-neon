import Editor from 'src/Editor.vue'
import { createVM } from '../helpers/utils.js'

const app = {
  data: () => ({
    gens: [
      {
        name: 'Inputer',
        class: 'n-inputer',
        pos: { x: -300, y: 500 },
        output: [
          {
            value: null,
            connection: []
          }
        ]
      },
      {
        name: '规划设计',
        class: 'n-generator',
        pos: { x: 0, y: 500 },
        task: {
          in: null,
          out: null
        },
        input: [
          {
            name: '用地红线',
            type: '0',
            value: '',
            connection: []
          }
        ],
        output: [
          {
            name: '平面线稿',
            type: '1',
            value: '',
            connection: []
          },
          {
            name: '立面线稿',
            type: '1',
            value: '',
            connection: []
          },
          {
            name: '体量模型',
            type: '1',
            value: '',
            connection: []
          }
        ]
      },
      {
        name: '总图填色',
        class: 'n-generator',
        pos: { x: 300, y: 400 },
        task: {
          in: null,
          out: null
        },
        input: [
          {
            name: '平面线稿',
            type: '1',
            value: '',
            connection: []
          }
        ],
        output: [
          {
            name: '平面线稿',
            type: '1',
            value: '',
            connection: []
          },
          {
            name: '立面线稿',
            type: '1',
            value: '',
            connection: []
          }
        ]
      },
      {
        name: '立面生成',
        class: 'n-generator',
        pos: { x: 300, y: 600 },
        task: {
          in: null,
          out: null
        },
        input: [
          {
            name: '立面线稿',
            type: '1',
            value: '',
            connection: []
          }
        ],
        output: [
          {
            name: '平面线稿',
            type: '1',
            value: '',
            connection: []
          },
          {
            name: '立面线稿',
            type: '1',
            value: '',
            connection: []
          }
        ]
      }
    ]
  }),
  components: { Editor }
}

describe('Editor.vue', function () {
  it('should render correct contents', function () {
    createVM(this, `
    <Editor
    width="100%"
    height="500px"
    :state="{x: 471.16107284337284, y: -412.6972876983468, z: 1.2037325418367204}"
    :sensitive="0.1"
    :minZoom="0.3"
    :maxZoom="6"
    :generators="gens"
    />
    `, app)
  })
})
