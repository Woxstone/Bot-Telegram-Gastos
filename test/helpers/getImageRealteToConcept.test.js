import axios from 'axios';
jest.mock('axios');
import  cheerio  from 'cheerio';
import { fsyncSync } from 'fs';
jest.mock('cheerio');
import  path  from 'path';
jest.mock('path');
import fs from 'fs';
jest.mock('fs');
// import { logger } from '../../src/helpers/logger.js';
// jest.mock('logger');
import { getImageRealteToConcept } from '../../src/helpers/getImageRealteToConcept.js';



describe('getImageRealteToConcept testing', () => {
    it('Test normal behaviour', () => {
        jest.spyOn(global.Math, 'floor').mockReturnValueOnce(0);
        axios.get
        .mockImplementationOnce(()=>{
            return {data:'testdata'}
                                })
        .mockImplementationOnce(()=>{
            return {data:{pipe:()=>jest.fn()}}
                                });
        cheerio.load.mockImplementationOnce(()=>{ 
            return ()=>{ return [{attribs:{src:'theimageurl'}}]};
        })
        path.resolve.mockImplementationOnce(()=>{
            return 'a good file';
        })
        fs.createWriteStream.mockImplementationOnce(()=>{
            return {on: (message,callback) =>callback()}
           
        })
      


        return  getImageRealteToConcept('good concept').then(result => {
            expect(result).toEqual('a good file');
            });;
    })
})
