# LangBot：企业级即时通讯 AI 机器人平台 配置篇

> *“专为企业打造的即时通讯 AI 机器人平台，无缝集成飞书（Lark）、钉钉、企业微信等企业通讯工具，与 Dify 等 AI 应用平台深度整合，让企业 AI 应用快速落地。”*

[LangBot 项目地址](https://github.com/langbot-app/LangBot) · [LangBot 项目官网](https://langbot.app) · [LangBot 社区](https://docs.langbot.app/zh/insight/community) · [项目文档](https://docs.langbot.app/zh/insight/guide) · [我的博客](https://typerbody.xyz)

**LangBot**（原 QChatGPT）是一款专为企业设计的开源 AI 机器人平台，立项于 2021 年中旬。它专注于帮助企业将 AI 能力无缝集成到现有的工作流程中，特别针对使用飞书（Lark）和 Dify 的企业用户，提供了完整的解决方案，让企业能够快速部署智能客服、知识库助手、工作流自动化等 AI 应用。

## 系统环境配置

配置文件位于 `data/config.yaml`，包含系统运行所需的环境信息。通常情况下无需修改。

```yaml
# 管理员会话列表，仅在处理命令时有效
# 格式为会话ID（person_xxxx 或 group_xxxx）
# 会话ID可以在发送消息时查看控制台日志获取
# 示例：
# admins:
#   - person_1234567890
#   - group_1234567890
admins: []

# API 配置
api:
    port: 5300
    # LangBot统一管理所有需要Webhook监听的机器人地址
    # 这是显示在需要Webhook连接的机器人页面上的地址前缀
    # 可根据实际网络环境修改
    webhook_prefix: 'http://127.0.0.1:5300'

# 命令配置
command:
    # 命令前缀，以此开头的消息会被识别为命令
    prefix:
    - '!'
    - ！
    # 命令权限配置，key为命令前缀，value为权限类型
    privilege: {}

# 并发设置
concurrency:
    # 单流水线并发数
    pipeline: 20
    # 单会话并发数
    session: 1

# 数据库配置
database:
    # 支持的数据库：
    # - sqlite：本地SQLite数据库（默认）
    # - postgresql：PostgreSQL数据库
    use: sqlite
    sqlite:
        path: 'data/langbot.db'
    postgresql:
        host: '127.0.0.1'
        port: 5432
        user: 'postgres'
        password: 'postgres'
        database: 'postgres'

# 插件系统配置
plugin:
    # 是否启用插件系统
    enable: true
    # 插件运行时WebSocket地址
    # 默认值为Docker环境配置
    # 如需使用独立Plugin Runtime，请参考文档
    runtime_ws_url: 'ws://langbot_plugin_runtime:5400/control/ws'
    # 是否启用插件市场
    enable_marketplace: true
    # 插件市场地址
    cloud_service_url: 'https://space.langbot.app'

# 代理配置
proxy:
    # HTTP代理地址
    # 如已在环境变量中设置代理，则无需配置
    # 示例：
    # proxy:
    #     http: 'http://127.0.0.1:7890'
    #     https: 'http://127.0.0.1:7890'
    http: ''
    https: ''

# 对象存储配置
storage:
    # 支持的对象存储：
    # - local：本地存储（默认）
    # - s3：S3协议对象存储（兼容R2、MinIO等）
    use: local
    s3:
        endpoint_url: ''
        access_key_id: ''
        secret_access_key: ''
        region: 'us-east-1'
        bucket: 'langbot-storage'

# 系统配置
system:
    # JWT配置
    jwt:
        # 过期时间（秒）
        expire: 604800
        # 密钥，首次启动时自动生成
        secret: 'xxxx'
    # 是否允许修改密码
    allow_change_password: true
    # 恢复密钥
    recovery_key: 'xxxx'

# 向量数据库配置
vdb:
    # 支持的向量数据库：
    # - chroma：嵌入式向量数据库（默认）
    # - qdrant：外部向量数据库
    # - milvus：可扩展向量数据库
    # - pgvector：PostgreSQL扩展
    # - seekdb：内置嵌入模型的数据库
    use: chroma
    qdrant:
        url: ''
        host: localhost
        port: 6333
        api_key: ''
    milvus:
        uri: 'http://127.0.0.1:19530'
        token: ''
    pgvector:
        host: '127.0.0.1'
        port: 5433
        database: 'langbot'
        user: 'postgres'
        password: 'postgres'
    seekdb:
        # 模式：embedded（嵌入式）或 server（服务端）
        mode: embedded  
        # 嵌入式模式配置
        path: './data/seekdb'          
        database: 'langbot'            
        # 服务端模式配置（mode='server'时生效）
        host: 'localhost'              
        port: 2881                     
        user: 'root'                   
        password: ''                   
        # 可选，用于OceanBase多租户场景
        tenant: ''    
```

## 环境变量配置

`config.yaml` 中的所有配置项均可通过环境变量进行覆盖。环境变量名称采用大写字母，层级之间使用双下划线 `__` 连接：

| 环境变量 | 对应配置项 |
|---------|-----------|
| `API__PORT` | `api.port` |
| `CONCURRENCY__PIPELINE` | `concurrency.pipeline` |
| `CONCURRENCY__SESSION` | `concurrency.session` |
| `DATABASE__POSTGRESQL__DATABASE` | `database.postgresql.database` |
| `DATABASE__POSTGRESQL__HOST` | `database.postgresql.host` |
| `DATABASE__SQLITE__PATH` | `database.sqlite.path` |

启动时，LangBot 会自动读取所有匹配的环境变量，将对应的配置合并到 `config.yaml` 中，并写入 `data/config.yaml` 文件。
