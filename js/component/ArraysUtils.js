/**
 *
 *
 * Created by Yllds on 2017/4/17.
 */

export  default class ArraysUtils{

    static isAbsEqual (a,b){
        return JSON.stringify(a)===JSON.stringify(b);
    }

    static  clone(a){
        return a.map((item)=>{
            var b={};
            for(var p in item){
                b[p]=item[p];
            }
            return b;
        });

    }


}
