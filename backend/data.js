import bcrypt from 'bcryptjs';

const data = {

    users: [
        {

            name: 'Gokul',
            email: 'gokul@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'Naveen',
            email: 'naveen@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },
    ],

    languages: [
        {
            name: 'JavaScript',
            image: '/images/l1.png',
            bugList: [
                {
                    _id: 'b1',
                    name: 'Null is not an object',
                    category: 'TypeError',
                    language: 'JavaScript',
                    reason: 'calling method on null objects',
                    testingTool: 'Safari Developer Console',
                    solution: 'adding an event listener',
                    refLink: 'https://stackoverflow.com/questions/14207922/javascript-error-null-is-not-an-object',
                    addedBy: 'Admin',
                },
                {
                    _id: 'b3',
                    name: 'Null is not an object',
                    category: 'TypeError Adv',
                    language: 'JavaScript',
                    reason: 'calling method on null objects',
                    testingTool: 'Safari Developer Console',
                    solution: 'adding an event listener',
                    refLink: 'https://stackoverflow.com/questions/14207922/javascript-error-null-is-not-an-object',
                    addedBy: 'Admin',
                }
            ]
        },
        {
            
            name: 'Python',
            image: '/images/l2.png',
            bugList: [
                {
                    _id: 'b2',
                    name: 'Indentation',
                    category: 'non-typo error',
                    language: 'Python',
                    reason: 'Not following indentation rules',
                    testingTool: '',
                    solution: 'Avoid mixing tabs and spaces in the indentation of a given single block',
                    refLink: 'https://www.edureka.co/blog/indentation-error-in-python/#:~:text=The%20cause%20of%20Indentation%20Error%20in%20Python,-As%20mentioned%20in&text=Since%20python%20makes%20use%20of,most%20likely%20experience%20this%20error.',
                    addedBy: 'Admin',
                }
            ]
        },
        {
           
            name: 'TypeScript',
            image: '/images/l3.png',
            bugList: []
        },
        {
           
            name: 'Dart',
            image: '/images/l4.png',
            bugList: []
        },
        {
           
            name: 'HTML',
            image: '/images/l5.png',
            bugList: []
        },
        {
            
            name: 'CSS',
            image: '/images/l6.png',
            bugList: []
        },
    ],

    bugs: [
        {
            name: 'Null is not an object',
            category: 'TypeError',
            language: 'JavaScript',
            reason: 'calling method on null objects',
            testingTool: 'Safari Developer Console',
            solution: 'adding an event listener',
            refLink: 'https://stackoverflow.com/questions/14207922/javascript-error-null-is-not-an-object',
            addedBy: 'Admin',
        },
        {
            name: 'Indentation',
            category: 'non-typo error',
            language: 'Python',
            reason: 'Not following indentation rules',
            testingTool: 'xxx',
            solution: 'Avoid mixing tabs and spaces in the indentation of a given single block',
            refLink: 'https://www.edureka.co/blog/indentation-error-in-python/#:~:text=The%20cause%20of%20Indentation%20Error%20in%20Python,-As%20mentioned%20in&text=Since%20python%20makes%20use%20of,most%20likely%20experience%20this%20error.',
            addedBy: 'Admin',
        },
        {
            name: 'Null is not an object',
            category: 'TypeError Adv',
            language: 'JavaScript',
            reason: 'calling method on null objects',
            testingTool: 'Safari Developer Console',
            solution: 'adding an event listener',
            refLink: 'https://stackoverflow.com/questions/14207922/javascript-error-null-is-not-an-object',
            addedBy: 'Admin',
        }
    ]
}

export default data;
