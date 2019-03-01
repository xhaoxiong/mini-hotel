Component({
    externalClasses: ['i-class'],

    options: {
        multipleSlots: true
    },

    properties: {
        full: {
            type: Boolean,
            value: false
        },
        thumb: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: ''
        },
        extra: {
            type: String,
            value: ''
        },
        extra_color:{
           type:String,
           value:'#80848f'
        }
    }
});
