var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
});

app.message = 'i have changed the data!';

var app2 = new Vue({
  el: '#app-2',
  data: {
      message: 'You loaded this page on' + new Date().toLocaleDateString(),
  }
});

var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true,
    }
});

var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            { text: 'Learn JavaScript' },
            { text: 'Learn Vue' },
            { text: 'Build something awesome' }
        ]
    }
});

var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'Hello Vue.js'
    },
    methods: {
        reverseMessage: function(){
            this.message = this.message.split('').reverse().join('');
        }
    }
});

var app6 = new Vue({
    el: '#app-6',
    data: {
        message: 'Hello Vue'
    }
});

//todo-itemという新しいコンポーネントを定義
Vue.component('todo-item', {
    //todo-item コンポーネントはカスタム属性のようなプロパティで受け取る。
    //このプロパティは todo と呼ばれる
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: [
            { id: 0, text: 'Vegetables' },
            { id: 1, text: 'Cheese' },
            { id: 2, text: 'Whatever else humans are aupposed to eat' },
        ]
    }
});

//====================ここまでが初めにの章===============

//====================Vue インスタンス==================

//データオブジェクト
var data = { a: 1};

//Vueインスタンスにオブジェクトを追加する
var vm = new Vue({
    data:data
});

//インスタンスのプロパティを取得すると、
//元のデータからそのプロパティが返される。
vm.a == data.a;// => true

//プロパティへの代入は、元のデータにも反映
vm.a = 2; //data.a => 2

//その逆もまたしかり
data.a = 3; // vm.a -> 3


//create フック
//インスタンスが生成された後にコードを実行したいときに使う

new Vue({
    data: {
        a: 1
    },
    created: function(){
        //this はインスタンスを差す
        console.log('a is:' + this.a);
    }
});  
// -> a is : 1

//他にも mounted, updated, destroyed など
//すべてのライフサイクルフックは this がVue　インスタンスを指す形で実行される。

//インスタンスプロパティ、コールバックでアロー関数を使うとエラーになる。

