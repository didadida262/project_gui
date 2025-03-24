import testimg1 from '@/assets/images/common/test.jpg'
import testimg2 from '@/assets/images/common/test2.jpg'
import testimg3 from '@/assets/images/common/test3.jpg'
import testimg4 from '@/assets/images/common/test4.jpg'
import testimg5 from '@/assets/images/common/test_gui_pic.webp'

export const MockBaseParams = [
    {
        name: '百亿比特图片处理速度',
        value: '-'
    },
        {
        name: '512*512分块图像处理速度',
        value: '-'
    },
    {
        name: '漏筛率',
        value: '-'
    }
]

export const MockCategories = [
    {
        id: 1,
        name: 'cat',
        data: [
            {
                id: 1,
            },
            {
                id: 2,

            },
            {
                id: 3,

            }
        ]
    },
    {
        id: 2,
        name: 'dog',
        data: []

    },
    {
        id: 3,
        name: 'tigger',
        data: []

    }
]


export const MockPicData = [
    {
        id: 0,
        src: testimg5
    },
    {
        id: 1,
        src: testimg2
    },
    {
        id: 2,
        src: testimg3
    },
    {
        id: 3,
        src: testimg4
    },
    {
        id: 4,
        src: testimg4
    }

]
