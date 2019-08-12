import Editor from 'src/Editor.vue'
import { createVM } from '../helpers/utils.js'
import NGenerator from '../Components/Generator'
import NInputer from '../Components/Inputer'
import NFileInput from '../Components/FileInput'

const app = {
  data: () => ({
    gens: [
      {
        name: 'Inputer',
        class: 'n-inputer',
        uuid: '542c4954-b500-11e9-b47c-699f8c76c8eb',
        component: NInputer,
        pos: { x: -300, y: 500 },
        output: [
          {
            value: null,
            connection: []
          }
        ]
      },
      {
        name: 'File',
        class: 'n-file-input',
        uuid: 'bab70a64-b4ed-11e9-947a-2d58884da378',
        component: NFileInput,
        pos: { x: -300, y: 550 },
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
        uuid: 'df85ba02-b35d-11e9-ac40-03933675bf3b',
        component: NGenerator,
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
        uuid: '3dd2d8ac-aead-11e9-be8f-33b4942db9e5',
        component: NGenerator,
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
        uuid: 'd8a9ceb4-b35b-11e9-be90-833ca54ac1bd',
        component: NGenerator,
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
