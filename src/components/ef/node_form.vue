<template>
    <div>
        <div class="ef-node-form">
            <div class="ef-node-form-header">
                编辑
            </div>
            <div class="ef-node-form-body">
                <el-form :model="node" ref="dataForm" label-width="80px" v-show="type === 'node'">
                    <el-form-item label="类型">
                        <el-input v-model="node.type" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="名称">
                        <el-input v-model="node.name"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人">
                        <el-input v-model="node.inCharge"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间">
                        <el-input v-model="node.timeStart"></el-input>
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <el-input v-model="node.timeEnd"></el-input>
                    </el-form-item>
                    <el-form-item label="任务状态" >
                    <el-select v-model="node.state" placeholder="">
                        <el-option label="已完成" value="success"></el-option>
                        <el-option label="进行中" value="running"></el-option>
                        <el-option label="警告" value="warning"></el-option>
                        <el-option label="失败" value="error"></el-option>
                    </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="left坐标">
                        <el-input v-model="node.left"></el-input>
                    </el-form-item>
                    <el-form-item label="top坐标">
                        <el-input v-model="node.top"></el-input>
                    </el-form-item>
                    <el-form-item label="ico图标">
                        <el-input v-model="node.ico"></el-input>
                    </el-form-item> -->
                    <div v-for="(item, index) in node.new" :key="index">
                        <el-form-item>
                            <template #label>
                                {{item.mylabel}}
                            </template>
                            <el-input v-model="item.value"></el-input>
                            <!-- <el-button icon="el-icon-view" @click="seeMore[index] = true" >详情</el-button> -->
                            <el-button icon="el-icon-delete" @click="deleteOne" >删除</el-button>
                            
                            <!-- <el-dialog
                                title="提示"
                                :visible.sync="seeMore[index]"
                                width="30%"
                                :before-close="handleClose">
                                <span>这是一段信息</span>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="seeMore[index] = false">取 消</el-button>
                                    <el-button type="primary" @click="seeMore[index] = false">确 定</el-button>
                                </span>
                            </el-dialog> -->

                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button icon="el-icon-plus" @click="addMy">自定义描述</el-button>
                        <el-button type="primary" icon="el-icon-check" @click="save">保存</el-button>
                    </el-form-item>

                </el-form>
                <i class="el-icon-star-off" style="margin: 0.5rem;padding: 1rem;">&nbsp;&nbsp;
                    <span style="color: green; font-size: 14px;">提示 : </span> 
                    所有节点都修改完后请点击左上角
                    <br><br>
                    <span style="color: green; font-size: 16px;">【保存并上传该流程图】</span>
                    来在后台保存该流程图</i>

                <!-- <div center>
                    &nbsp;&nbsp;提示: 所有节点都修改完后请点击左上角
                    <br>
                    【保存并上传该流程图】
                    来在后端保存该流程图
                </div> -->

                
                <el-dialog title="添加新描述变量" :visible.sync="this.showAddNew">
                <el-form :model="form">
                    <el-form-item label="变量名称" label-width="100px">
                        <el-input v-model="form.mylabel" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" label-width="100px">
                        <el-input v-model="form.value" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancelAdd">取 消</el-button>
                    <el-button type="primary" @click="confirmAdd">确 定</el-button>
                </div>
                </el-dialog>



                <el-form :model="line" ref="dataForm" label-width="80px" v-show="type === 'line'">
                    <el-form-item label="条件">
                        <el-input v-model="line.label"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="el-icon-close">重置</el-button>
                        <el-button type="primary" icon="el-icon-check" @click="saveLine">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
<!--            <div class="el-node-form-tag"></div>-->
        </div>
    </div>

</template>

<script>
    import { cloneDeep } from 'lodash'

    export default {
        data() {
            return {
                visible: true,
                // seeMore: [],
                // node 或 line
                type: 'node',
                node: {},
                line: {},
                data: {},
                form: {
                    mylabel:'',
                    value:''
                },
                showAddNew: false
            }
        },
        methods: {
            /**
             * 表单修改，这里可以根据传入的ID进行业务信息获取
             * @param data
             * @param id
             */
            nodeInit(data, id) {
                this.type = 'node'
                this.data = data
               
                data.nodeList.filter((node) => {
                    if (node.id === id) {
                        this.node = cloneDeep(node)
                    }
                })
                console.log('我在这里')
            },
            lineInit(line) {
                this.type = 'line'
                this.line = line
            },
            // 修改连线
            saveLine() {
                this.$emit('setLineLabel', this.line.from, this.line.to, this.line.label)
            },

            // handleClose(done) {
            //     this.$confirm('确认关闭？')
            //     .then(_ => {
            //         done();
            //     })
            //     .catch(_ => {});
            // },

            save() {
                this.data.nodeList.filter((node) => {
                    if (node.id === this.node.id) {
                        node.name = this.node.name
                        // node.left = this.node.left
                        // node.top = this.node.top
                        node.inCharge = this.node.inCharge
                        node.state = this.node.state
                        node.timeStart = this.node.timeStart
                        node.timeEnd = this.node.timeEnd
                        node.new = this.node.new
                        console.log('康康我变了吗', node)
                        this.nodeInit(this.data, this.node.id)
                    }
                })
            },
            deleteOne(index) {
                this.node.new.splice(index,1);
                console.log('康康我现在',this.node.new)
                console.log('看看this.node',this.node)
                console.log('看看this.data.nodeList',this.data.nodeList)

            },

            addMy() {
                this.showAddNew = true
            },
            cancelAdd() {
                this.form.mylabel = '',
                this.form.value = '',
                console.log('现在的form',this.form),
                this.showAddNew = false
            },
            confirmAdd() {
                console.log('现在的form confirm',this.form)
                this.showAddNew = false,
                this.data.nodeList.filter((node) => {
                    if (node.id === this.node.id) {
                        node.new.push({
                            mylabel: this.form.mylabel,
                            value: this.form.value
                        }
                        )
                    }
                })
                console.log(this.data.nodeList)
                this.nodeInit(this.data, this.node.id)
            }
        }
    }
</script>

<style>
    .el-node-form-tag {
        position: absolute;
        top: 50%;
        margin-left: -15px;
        height: 40px;
        width: 15px;
        background-color: #fbfbfb;
        border: 1px solid rgb(220, 227, 232);
        border-right: none;
        z-index: 0;
    }
</style>
