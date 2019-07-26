import Vue from 'vue'
import { mount, shallowMount } from '@vue/test-utils'
import { render } from '@vue/server-test-utils'
import NuDialog from '../src'
import Demo from './demo'
import sinon from 'sinon'
import FakeTimers from '@jest/fake-timers/build/jestFakeTimers';
import { wrap } from 'module';

 
describe('NuDialog开关问题', () => {
    it('is a Vue instance', () => {
        const wrapper = mount(NuDialog)
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
    //open
    it('初始化为关闭的状态', async () => {
        const wrapper = mount(NuDialog,{
            propsData:{
                open:false
            }
        })
        wrapper.setProps({open:true})
        //是否打开
        expect(document.body.className).toEqual(expect.stringContaining("nu_dialog_open"))
        expect(wrapper.vm.show).toEqual(false)
        expect(wrapper.vm.render).toEqual(true)
        await new Promise((rs)=>{
            setTimeout(()=>{
                expect(wrapper.vm.show).toEqual(true)
                expect(wrapper.vm.render).toEqual(true)
                rs()
            },16)
        })
        // // 关闭
        wrapper.setProps({open:false})
        expect(document.body.className).not.toEqual(expect.stringContaining("nu_dialog_open"))
        expect(wrapper.vm.show).toEqual(false)
        expect(wrapper.vm.render).toEqual(true)
        await new Promise((rs)=>{
            setTimeout(()=>{
                expect(wrapper.vm.show).toEqual(false)
                expect(wrapper.vm.render).toEqual(false)
                rs()
            },200)
        })
    })
    it('初始化为打开的状态',async ()=>{
        const wrapper = mount(NuDialog,{
            propsData:{
                open:true,
            }
        })
        // 关闭
        await new Promise((rs)=>{
            setTimeout(()=>{
                wrapper.setProps({open:false})
                expect(document.body.className).not.toEqual(expect.stringContaining("nu_dialog_open"))
                expect(wrapper.vm.show).toEqual(false)
                expect(wrapper.vm.render).toEqual(true)
                setTimeout(()=>{
                    expect(wrapper.vm.show).toEqual(false)
                    expect(wrapper.vm.render).toEqual(false)
                    rs()
                },200)
            },16)
        })
        // 打开
        wrapper.setProps({open:true})
        expect(document.body.className).toEqual(expect.stringContaining("nu_dialog_open"))
        expect(wrapper.vm.show).toEqual(false)
        expect(wrapper.vm.render).toEqual(true)
        await new Promise((rs)=>{
            setTimeout(()=>{
                expect(wrapper.vm.show).toEqual(true)
                expect(wrapper.vm.render).toEqual(true)
                rs()
            },16)
        })
        
    })
    // //position
    
    it('dialog position', async () => {
        const wrapper = mount(NuDialog)
        expect(wrapper.classes("_middle")).toEqual(true)
        wrapper.setProps({"position":"top"})
        expect(wrapper.classes("_top")).toEqual(true)
        wrapper.setProps({"position":"left"})
        expect(wrapper.classes("_left")).toEqual(true)
        wrapper.setProps({"position":"right"})
        expect(wrapper.classes("_right")).toEqual(true)
        wrapper.setProps({"position":"bottom"})
        expect(wrapper.classes("_bottom")).toEqual(true)
        expect(wrapper.classes("_middle")).toEqual(false)
    })

    //speed
    it('关闭动画速度',async ()=>{
        const wrapper = mount(NuDialog,{
            propsData:{
                open:true,
                speed:500
            }
        })
        //  关闭弹窗
        await new Promise((rs,rj)=>{
            setTimeout(()=>{
                wrapper.setProps({open:false})
                setTimeout(()=>{
                    expect(wrapper.vm.show).toEqual(false)
                    expect(wrapper.vm.render).toEqual(true)
                    setTimeout(()=>{
                        expect(wrapper.vm.show).toEqual(false)
                        expect(wrapper.vm.render).toEqual(false)
                        rs()
                    },400)
                },100)
            },16)
        })
    })
    it('用户快速快关',async ()=>{
        const wrapper = mount(NuDialog)
        wrapper.setProps({open:true})
        wrapper.setProps({open:false})
        wrapper.setProps({open:true})
        wrapper.setProps({open:true})
        wrapper.setProps({open:false})
        await new Promise((rs,rj)=>{
            setTimeout(()=>{
                expect(wrapper.vm.show).toEqual(false)
                expect(wrapper.vm.render).toEqual(false)
                rs()
            },300)
        })
    })
})

describe('beforeClose api',()=>{
    it('beforeClose触发成功', async () => {
        let invoke=false
        const wrapper = mount(NuDialog,{
            propsData:{
                open:true,
                speed:100,
                beforeClose:()=>{
                    invoke=true
                }
            }
        })
        await new Promise((rs,rj)=>{
            setTimeout(()=>{
                wrapper.setProps({open:false})
                expect(invoke).toBe(true)
                rs()
            },16)
        })
    })
    it('beforeClose返回false时，不关闭dialog', async () => {
        const wrapper = mount(NuDialog,{
            propsData:{
                open:true,
                speed:100,
                beforeClose:()=>{
                    return false
                }
            }
        })
        await new Promise((rs,rj)=>{
            setTimeout(()=>{
                // 这里一定要在open动作结束之后再操作
                wrapper.setProps({open:false})
                setTimeout(()=>{
                    expect(document.body.className).toEqual(expect.stringContaining("nu_dialog_open"))
                    rs()
                },100)
            },16)
        })
    })
})

describe('基于父元素 NuDialog trigger button', () => {
    it('close button的触发', async () => {
        const wrapper = mount(Demo)
        wrapper.find("button").trigger("click")
        expect(document.body.className).toBe("nu_dialog_open")
        wrapper.find(".nu_dialog_close").trigger("click")
        expect(document.body.className).toBe("")
    })
    it('mask的触发', async () => {
        const wrapper = mount(Demo)
        const dialog=wrapper.find(".nu_dialog_wrap")
        wrapper.find("button").trigger("click")
        expect(document.body.className).toBe("nu_dialog_open")
        wrapper.find(".nu_dialog_mask").trigger('click')
        expect(document.body.className).toBe("")
        
    })
})

describe('基于父元素 销毁dialog', () => {
    it('destory',  () => {
        const spy = sinon.stub()
        mount(NuDialog,{
            destroyed() {
                spy()
            }
        }).destroy()
        expect(spy.calledOnce).toBe(true)
    })
})