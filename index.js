import { Client, GatewayIntentBits, Partials, ModalBuilder, Embed, ActionRowBuilder, ButtonBuilder,ChannelType, ButtonStyle,PermissionsBitField, Guild, VoiceChannel, User, Message, TextInputBuilder, TextInputStyle, messageLink } from "discord.js";
import {config} from "dotenv";
config();
const client = new Client({
    intents:131071,
    partials:[Partials.Channel,Partials.User,Partials.Message,Partials.GuildMember,Partials.Reaction],

});
client.on('ready', ()=>{
    client.user.setActivity("Enter Text",{type:0}); //Enter text 
    client.user.setStatus('online'); //change online to change bot status
    client.application.commands.create({
        name:"clear",
        description:"Clear multipistes messages",
        type:1,
        defaultMemberPermissions:"ManageMessages",
        options:[{
            name:"ammount",
            description:"Enter number of message",
            type:4,
            min_value:1,
            max_value:100,
            required:true,

        }]
    })
    client.application.commands.create({
        name:"server",
        description:"Show server info",
        type:1,
    })
    
})
client.on("interactionCreate",async (cmd)=>{
    if(cmd.isChatInputCommand()){
        if(cmd.commandName == "clear"){
            const ammount = cmd.options.getInteger('ammount');
            cmd.channel.bulkDelete(ammount, true),
            cmd.reply({content:`${ammount} Messages deleted in <#${cmd.channelId}>`,ephemeral:true});
        }
        if(cmd.commandName == "server"){
            cmd.reply({
                embeds:[{
                    title:`${cmd.guild.name}`,
                    description:`${cmd.guild.description}`,
                    author:{
                        name:`${client.user.username}`,
                        icon_url:`${client.user.displayAvatarURL()}`,
                    },
                    footer:{
                        text:`${cmd.user.username}`,
                        icon_url:`${cmd.user.displayAvatarURL()}`,
                    },
                    timestamp: new Date().toISOString(),
                    fields:[
                        {
                            name:"Server Owner",
                            value:`<@${cmd.guild.ownerId}>`,
                            inline:true,
                        },
                        {
                            name:"Total Members",
                            value:`${cmd.guild.memberCount}`,
                            inline:true,
                        },
                        {
                            name:"Roles",
                            value:`${cmd.guild.roles.cache.size}`,
                            inline:true,
                        },
                        
                        {
                            name:"Total Channels",
                            
                            value:`${cmd.guild.channels.cache./*fetch()*//*.*/filter(
                                (channel) => channel.type != 'GUILD_CATEGORY'
                            ).size}`,
                            inline:true,
                        },
                        {
                            name:"Created At",
                            value:`${cmd.guild.createdAt.toLocaleString()}`,
                        },
                        {
                            name:"Bot Developer",
                            value:"<@857551068082733056>",
                            inline:true,
                        }

                    ],
                    thumbnail:{
                        url:`${cmd.guild.iconURL()}`,
                    },
                    color:embed_color,
                }]
            })
        }
    }
})

const embed_color = 0xFAC62B;
client.login(process.env.TOKEN).then(() => {
    console.log(`${client.user.username} Started No Errors`)
}).catch(console.error);
