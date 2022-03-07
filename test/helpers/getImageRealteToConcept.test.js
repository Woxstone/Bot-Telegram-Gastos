import { logger } from '../../src/helpers/logger.js';
jest.mock('../../src/helpers/logger.js');
import axios from 'axios';
jest.mock('axios');
import  cheerio  from 'cheerio';
jest.mock('cheerio');
import  path  from 'path';
jest.mock('path');
import fs from 'fs';
jest.mock('fs');
import { getImageRealteToConcept } from '../../src/helpers/getImageRealteToConcept.js';

afterEach(() => {
axios.get.mockReset();
cheerio.load.mockReset();
fs.createWriteStream.mockReset();
path.resolve.mockReset();
logger.info.mockReset();
logger.error.mockReset();
});

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
    it('Test error retrieving the webpage images source', () => {
        jest.spyOn(global.Math, 'floor').mockReturnValueOnce(0);
        axios.get
        .mockImplementationOnce(()=>{
            throw 'Error in getImage'
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
            expect(result).toEqual('./assets/oops.jpg');
            expect(logger.error).toHaveBeenCalledWith('Error in getImage');
            });;
    })
    it('Test if not imageurl', () => {
        jest.spyOn(global.Math, 'floor').mockReturnValueOnce(0);
        axios.get
        .mockImplementationOnce(()=>{
            return {data:'testdata'}
                                })
        .mockImplementationOnce(()=>{
            return {data:{pipe:()=>jest.fn()}}
                                });
        cheerio.load.mockImplementationOnce(()=>{ 
            return ()=>{ return [{attribs:{src:''}}]};
        })
        path.resolve.mockImplementationOnce(()=>{
            return 'a good file';
        })
        fs.createWriteStream.mockImplementationOnce(()=>{
            return {on: (message,callback) =>callback()}
           
        })
      
        return  getImageRealteToConcept('good concept').then(result => {
            expect(result).toEqual('./assets/oops.jpg');
            expect(logger.info).toHaveBeenCalledWith('error info');
            });;
    })  

    it('Test if imagename has / on the text', () => {
        jest.spyOn(global.Math, 'floor').mockReturnValueOnce(0);
        axios.get
        .mockImplementationOnce(()=>{
            return {data:'testdata'}
                                })
        .mockImplementationOnce(()=>{
            return {data:{pipe:()=>jest.fn()}}
                                });
        cheerio.load.mockImplementationOnce(()=>{ 
            return ()=>{ return [{attribs:{src:'good imageurl'}}]};
        })
        path.resolve.mockImplementationOnce(()=>{
            return 'a good file';
        })
        fs.createWriteStream.mockImplementationOnce(()=>{
            return {on: (message,callback) =>callback()}
           
        })
      
        return  getImageRealteToConcept('bad/concept').then(result => {
            expect(result).toEqual('./assets/oops.jpg');
            expect(logger.info).toHaveBeenCalledWith('error info');
            });;
    })  
})
