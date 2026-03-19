# LangBot：企业级即时通讯 AI 机器人平台 LangBot&登录篇

> *"专为企业打造的即时通讯 AI 机器人平台，无缝集成飞书（Lark）、钉钉、企业微信等企业通讯工具，与 Dify 等 AI 应用平台深度整合，让企业 AI 应用快速落地。"*

[LangBot项目地址](https://github.com/langbot-app/LangBot) [LangBot项目官网]() [LangBot项目社区](https://docs.langbot.app/zh/insight/community) [我的博客](https://typerbody.xyz) [LangBot项目文档](https://docs.langbot.app/zh/insight/guide)

**LangBot**（原 QChatGPT）是一款专为企业设计的开源 AI 机器人平台，立项于 2021 年中旬。它专注于帮助企业将 AI 能力无缝集成到现有的工作流程中，特别针对使用飞书（Lark）和 Dify 的企业用户，提供了完整的解决方案，让企业能够快速部署智能客服、知识库助手、工作流自动化等 AI 应用。

## Langbot登录界面

![image](/images/langbot_login1.png)
>*'这是你与ai建立联系的起点，~~tnn终于讲到本体了，我不知道把这些讲完要讲到后年马月~~'*

可见这里提供了两种注册方式 一个是 `langbot space` 另一个是 `邮箱与密码混合登录` 这两种我要分开 ~~langbot小伙爱评价，非常之客观，非常之理性，各有各的美~~

### LangBot Space登录

这个登录方法好处很多可以直接使用LangBot Space model服务 不需要额外的绑定其他东西 并且登录速度很快

![image](/images/langbot_login2.png)

大概是这样了 唯一就是以后只能使用LangBot space登录了，不过这种安全性较高，之后错误会通过遥测上报并及时修复

#### 如何确定自己是否使用LangBot Space登录

![image](/images/langbot_model1.png)

如果是图上这样 那就是没有使用LBS登录了
一般是显示积分的
或者是登录错误 需要重新登录啊
>*'如果是登录错误 那就很折磨人了 要删掉date下langbot.db的数据库重启langbot服务了'*

#### 模型配置初步

在这里讲一下主要是告诉大家不经过langbot space的模型配置在哪里

![image](/images/langbot_model2.png)

### 邮箱密码混合登录

首次登录完成后填入自己的邮箱密码二次登录就行

![image](/images/langbot_login3.png)

#### 放弃账密使用LBSM服务

没办法 我懒得看代码怎末写的 绑定以后会覆盖账密 之后只能使用LBS登录 但是登录框仍然存在
>*'![image](/images/langbot_db.png)'*

步入正题 在模型配置位置

![image](/images/langbot_login4.png)

你会发现在LBSM服务的位置会出现绑定LBS账号

![image](/images/langbot_login5.png)

然后点击

![image](/images/langbot_login6.png)

建议阅读一下须知 因为真的会覆盖掉的 就不能使用账密登录了

之后会提示
![image](/images/langbot_login7.png)

#### 修改密码

如果你 注 意 力 惊 人 你肯定注意到了

![imagr](/images/langbot_login8.png)

![imagr](/images/langbot_change.png)

找到向关文件对应字段
>*'如果你使用容器部署 则需要进入容器内部查看'*

![image](/images/langbot_login9.png)

然后填写完修改就行




# 啊 卧槽终于讲完登录了 我要睡了
# 卧槽 我好像没讲webui以及端口配置啊
# 算了 明天讲解