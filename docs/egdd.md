# Command the Dungeon

## Elevator Pitch

You wake up in some weird, dimly-lit room, not knowing where you are or how you got there. All you know is that you need to escape this room. Throughout the game, you the player will be navigating various rooms and solving puzzles via a command terminal with bash commands. Be warned though, as one mistake could cost you your life.

## Influences (Brief)

- Kings Quest:
  - Medium: Video Game (Text Base, DOS, Exploratory)
  - Explanation: Uses a large variety of command inputs for the controls and actions, matches stylistically.
- Oregon Trail:
  - Medium: Video Game (Text Base, DOS, Resource Management)
  - Explanation: Uses command inputs for most of the controls, resource management is key.
- Riddle School:
  - Medium: Video Game (Flash, Newgrounds, Puzzle Solving)
  - Explanation: Focus on puzzles and room navigation, clear linear flow on progression, one of the more popular games in the genre our game is in.
- Zero Escape 999:
  - Medium: Video Game (DS, Point and Click, Mystery, Puzzle Solving)
  - Explanation: Focus on puzzles, room navigation, and item management, as well as a tense atmosphere that encourages quick thinking

## Core Gameplay Mechanics (Brief)

- Use commands to go in and out of items/file directories (I.E., if you are in a dorm, you would do `cd` refrigerator to go to the refrigerator).
- Use ls to list all items in a given are or room (I.E., I would do `ls` after I `cd` into a fridge to see its contents).
- Use color coding to indicate what items you can pick up or not(I.E., An item that can be picked up would be coded white).
- Different items will be color coded to match their equivalants in bash (I.E., something you can go into will be color coded like a folder, something thats runable will be color coded to match, items that are white can be picked up).
- In case someone is stuck, there will be a `help` command that lists all of the embedded commands in the game(I.E., if someone is having trouble with the `cd` command, `help` can be used to further explain and elaborate on how to use the `cd` command).
- If there is a possibility, be able to combine the two items(I.E., if there was an item that needed two or more inputs, then the `cat[item1][item2]` command could be useful).
- If a player wants to, they can have the ability to quit via the ctrl + c command.
- To pick up an item, the player can run the `mv` command to move it to your inventory
- For certain objects, you can also use the `mv` command to physically move them in the world
- To interact with puzzles, players will run executable files in the file system
- If at any time the player needs help with commands, they can run `help` for a menu of all the commands, or `[command] -h` for more info on a specific command

# Learning Aspects

## Learning Domains

- Navigating the Terminal
- Bash Command Programming

## Target Audiences

* Intermediate programmers with some prior knowledge
* Puzzle Solvers, particuarly those adept with escape rooms
* Users who frequently interact with the terminal/Bash

## Target Contexts

* This would be assigned as supplementary practice in a course formally teaching systems programming that frequently uses the terminal
* Due to the use of audio cues(potential WIP), most likely not appropriate for classroom use

## Learning Objectives

- Movement Through Files: By the end of the lesson, players will be able to competently use the `cd` command to move up and down different file systems.
- Listing Every File: By the end of the lesson, players will be able to competently use the `ls` command to list all of the files in a given directory.
- Executing Files: By the end of the lesson, players will be able to run files and executables in the terminal.
- Moving Files and Directories: By the end of the lesson, players will learn how to use the `mv` command to move files to and from directories.

## Prerequisite Knowledge

- Prior to the game, players need to be somewhat familiar with the terminal.
- Prior to the game, players need to be familiar with file navigation.
- Prior to the game, players should have a basic grasp on simple puzzles and logic.

## Assessment Measures
- There is a file system with the following hierarchy: a main folder, with two subfolders within it named dar and pab. Dar has another folder in it called scr. You are currently in the folder scr. Please write the bash code that would allow you to go from scr to pab. Answer: cd..
- What is the difference in functionality between commands `cat` and `sudo`?(One or more are correct)
  - What is the difference in functionality between the command `cat` and running an executable file?(One or more are correct)
  * A. Command `cat` allows for the combination of files, while running an executable file allows for the file to be ran. 
  * B. Command `cat` allows for the file to be ran, while running an executable file allows for the combination of files. 
  * C. Command `cat` helps with the inspection of files, while running an executable file helps with the examination of the output.
  * D. Command `cat` helps with the examination of the output, while running an executable file helps with the inspection of files. 
  * E. Command `cat` prints out readable text, while running an executable file allows for the combination of files. Answers: A and C
- There is a folder called "Pictures" with two subfolders labeled cat and dog. I want to move the file 'Ada.png' from the 'cat' subfolder to the 'dog' subfolder. Please write the bash code to go from the 'cat' subfolder to the 'dog' subfolder. Answer: mv cat/Ada.png dog.
- Propose that you are running a program in bash, but you do not know how to exit out of it. What would you do to exit out of the code? Answer: Control + C
- There is a file system with the following files: 'beta', 'gamma', 'omega', and 'fish'. Please write the bash code that would list out all of the files. Answer: ls
- There is a specific file within the file system named "execute.sh". There is a specific file system which has three folders, titled "Pictures", "Downloads", and "VMs". File "execute.exe" is in the folder "Downloads". Using the proper commands, please write the bash code that would execute the file "execute.exe". Answer: cd /Downloads, ./execute.exe

# What sets this project apart?

- Most command terminal activities focus strictly on command writing, this can have fun mechanics and fast-paced gameplay.
- The gameplay mechanics are supposted to mimic the feel of navigating a real file system, with a bit of abstraction, allowing the player to have fun doing tasks connected to learning, while also gaining those real world skills connected to the learning objectives.

# Player Interaction Patterns and Modes

## Player Interaction Pattern

This is a game for one person, they use the keyboard to interact with the game world via command inputs.

## Player Modes

- Single-player: You navigate through a short series of rooms

# Gameplay Objectives

- Advance to the next level:
    - Description: Get the door unlocked and move on to the next level. 
    - Alignment: This aligns with the learning objectives because in order to advance to the next level, `cd` into items will have to be used to access them, `ls` will have to be used to list all items out within a room, and `./[filename].exe` will have to be used to execute files within the directory.
- Escape the Rooms:
    - Description: Escape the facility and complete the game
    - Alignment: This aligns with the learning objectives because with escaping the facility and completing the game, the players will have demonstrated a comprehensive knowledge of how to move in between files via the `cd` command, how to list through items via the `ls` command, and how to execute files via the `./[filename].exe` command.
- Solve Puzzles: 
    - Description: Fully Complete a minigame in order to gain either more information or a new item
    - Alignment: This aligns with the learning objectives because solving these puzzles requires the player to utilize different aspects of the presented file system, by combining items with `cat [item1][item2]`, using interactables that are represented as executable files that require the user to run them, and moving elements in the game with `mv`.
  
# Procedures/Actions

All actions are done via an in game terminal. This includes:
- moving in and out of places via the `cd` command
- accessing the list of items via the `ls` command
- getting a list of all of the possible commands via the`help` command
- combining two items together with the `cat` command
- quitting out of specific puzzles with `ctrl + c`
- moving items into your inventory with the `mv` command
- moving elements in the game with the `mv` command
- interacting with puzzles via the terminal by typing something along the lines of `./[filename].exe`

# Rules

- If the player uses the wrong command, then a prompt appears saying "that command is not applicable."
  
- `cd`
    - If the player goes into a directory, the scenery changes to reflect that (I.E., if you `cd` into a fridge, the scenery would zoom into the fridge)
    - If you do `cd ../`, you will go back a directory (I.E., if you are in the fridge directory, and do `cd ../`,
         - If there is no parent directory, the player's terminal will show an error stating "No parent directory"
    - If the player attempts to access an item they cannot, a prompt will appear saying "that item is not accessible."
    
- `ls`
    - When used, will list out all current items and directories in the players current position via text in the terminal
         - Items in Blue text are directories
         - Items in Green text are executables
         - Items in Magenta text are images
         - Anything else will be in White
         - Any text that is bolded is unaccesible to the player
    - `ls [directory]` will show said directories files
    - Players will, at all times, be able to do `ls ./inventory` to see their inventory
          
- `mv`
    - When used correctly, a file or orbject will be moved into a designated directory
    - Format is: `mv [filename] [destination]`
         - You are also able to move directories, which will be shown in the game world by moving the physical object
         - You are also able to move multiple files, I.E. `mv text1.txt text2.text folder/`
    - If the file does not exist, the player will be prompted in the terminal that said file does not exist
    - If the directory does not exist, the player will be prompted in the terminal that said directory does not exist
    - If the file is unable to be moved, the player will be prompted in the terminal that said directory does not exist
    - Players will always be able to do `mv [item] inventory` at all times to move items into their inventory
    
- `help`
    - Lists out all commands and a brief description of what they do
    - You are also able to add the suffix `-h` to any command to see what they specifically do
         - You are unable to do `-h` on its own. If a player does, the terminal will prompt them saying that they are unable to do that
         - you must do `[base command] -h`. Anything additional will also be invalid.
         - I.E., `cd -h` will be allowed, and will show the description, but `cd ../ -h` wont 
      
- `./[filename].exe`
    - Runs a given exe file
         - If the file is not a '.exe' file, the terminal will print out a message saying that only .exe files can be run
      
- `cat`
    - Can only be used on .txt files
         - If used on a non-txt file, the terminal will print out a message saying that cat can only be used on text files
    - Can combine two items
         - `cat [fileA].txt [fileB].txt`
         - The combined items will be sent automatically to the inventory
         - If used on more than 2 files, the command fails, and the terminal will print out a message saying that only 2 text files can be combined
    - Can show the description of an item
         - `cat [filename].txt`
      
- `ctrl + c`
    - Exits out of a puzzle/.exe file
    - Only works is a .exe file is running
    - If nothing is running, the terminal will print out a message stating that no executable is running

# Objects/Entities

- There is a bar at the top of the screen that shows the current room location. The bar will not only have the location, but it will also have the name of the puzzle.
  - At the top left, there is also a simple mini map, to keep the player from getting lost. The mini map will have a layout of every puzzle there is within the game, in which the puzzle that the player is in will be color coded green.
- In the center of the screen, there is an image of the current location. 
  - Objects and entities will depend on the current location of the player. For example, some puzzles could have a key, while others could have some dice or some buckets. Some puzzles will have different items that could be combined, such as some water or some buckets, chemicals and flasks to create potions. For example, the first puzzle in the game could be a prison cell, in which one of the main items that the first puzzle could be centered around is a crowbar. The crowbar could be used to break down the cells in order to move on to the next puzzles.
- There is a command prompt that appears at the bottom of the screen where users can input commands
  - Previous commands will also be listed here. There will be a terminal in which players can see the previous commands that they inputted. For example, if the last command was `help`, the command that would be the lowest in the command terminal would be `help`.
- There is an inventory that showcases the items that the player has. The inventory will be used as a way for the player to get out of the puzzles through the utilization of those items.
  - Within the inventory, there will also be descriptions of these individual items. Each individual items will have a unique description that will facilitate in the player getting out.

## Core Gameplay Mechanics (Detailed)

- Movement: Via the command prompt at the bottom of the screen. Uses "cd," or "change directory." Also used to inspect items, like you can do "cd fridge" to go towards the fridge. "cd .." allows you to go back viewing the entire room.

![Example](https://file.garden/ZL77MieVhBA68iED/firstone/storyboard2.PNG)
![Example of using commands in other areas, and going back](https://file.garden/ZL77MieVhBA68iED/firstone/storyboard3.PNG)

- Listing Items: Via the command prompt at the bottom of the screen. Uses "ls." Shows the player a list of all items that are in the current room. 


![Listing items](https://file.garden/ZL77MieVhBA68iED/firstone/storyboard1.PNG)


- Picking up Items: the "mv" command to move an item to your inventory. Could alsob eused to interact with items physically.
- Color Coding: Int he command prompt, different types of items will be color coded, simmialr to how they are in actual bash programming. Items like containers or rooms that you can go into and inpect closely will appear blue, puzzles or interactables will be green and have the ".c" suffix. Items you can pick up could be labeled with ".png" or something simmilar
- Using Items: equip an item with the "cat" command., Item will then be moved to the players inventory. 

![Using an Item](https://file.garden/ZL77MieVhBA68iED/firstone/storyboard4.PNG)
![Unlocking a door](https://file.garden/ZL77MieVhBA68iED/firstone/storyboard5.PNG)

- Inventory: Will always be shown in the directory as a folder at all times, regardless of location. Command will be sometihng like "cd inventory," to go into your inventory
- Combining Items: Would use "cat [item 1] [item 2]" to combine stuff, both files would then be combined in the inventory
- Puzzles and Interactables: run as executable files in the terminal. Labeled as .c files. Then, depending on the puzzle, a prompt will appear in the terminal showing how the puzzle works, and what to type.
- Help Command: "help" in the command terminal. Lists all possible commands and their uses in the players terminal. you can also do "-h" on a command to get a bit more of a detailed description of their mechanics. I.E., "cd -h" will show you a description of the cd command
- Exiting a file or pizzle: Would be shown when doing a puzzle or inspecting an item that you just have to do "Ctrl + C" 
- Winning: Once the player does all required puzzles to open the door to their escape, they win the entire game, showing a quick little cutscene.

![Ending](https://file.garden/ZL77MieVhBA68iED/firstone/storyboard6.PNG)

## Feedback

* Inputting a command will immediately show you either a text prompt ("Task succeeded") or an ainimation of you doing the task if input was valid. If not, will prompt you saying it is incorrect
* When you inspect an object, the game zooms in on that object
* When you pick up an object, the command terminal will say you obtained it
* Interactable objects will be color coded as need be. Containers will be color coded to match folders in bash, and puzzles will be denoted as .c files
* When you escape, a short cutscene will play congratulating you on winning
* When equipping an item, a sound will play, and a text prompt will say that it was moved to your inventory

# Story and Gameplay

## Presentation of Rules

Text shown on the main game screen explains the objective and interaction instructions.

## Presentation of Content

The main content of the learning objective will be presented in gameplay by having the user use a specially designed file system that suits the game world, that is made to teach the user file management at the terminal level, as well as basic bash commands. What each command does will not only be shown in the player's terminal, but also represented in the actual game world via animation. For example, if a player wants to combine a piece of chewing gum with a pencil, they would do soemthing like `cat pencil chewing_gum`. The terminal will give the user a prompt describing what happens, and the game world will show the two items physically combined.

## Story (Brief)

You are trapped in a room, with no clue why you are there, or how you ended up there. It is your job to escape it in as little time as possible. (NOTE: The player's total game time will not be tracked, and does not affect the gameplay at all.)

## Storyboarding

![Example](https://file.garden/ZL77MieVhBA68iED/firstone/storyboard2.PNG)
![Example of using commands in other areas, and going back](https://file.garden/ZL77MieVhBA68iED/firstone/storyboard3.PNG)
![Listing items](https://file.garden/ZL77MieVhBA68iED/firstone/storyboard1.PNG)
![Using an Item](https://file.garden/ZL77MieVhBA68iED/firstone/storyboard4.PNG)
![Unlocking a door](https://file.garden/ZL77MieVhBA68iED/firstone/storyboard5.PNG)
![Ending](https://file.garden/ZL77MieVhBA68iED/firstone/storyboard6.PNG)

# Assets Needed

## Aethestics

The aesthetics should be semi cartoony, but down to earth style that converys a tense atmosphere. Limited color pallete to match old DOS games, should only have a maximum of 16. Art should be done in flat colors, possibly vectorized drawings.

## Graphical

- Characters List
  - Player: Is trapped in a dungeon
    - Will not be shown due to the game being first person 
- Textures: N/A
- Environment Art/Textures:
  - Background: The background should be a dim-lit dungeon that conveys an aura of feeling uneasy.

## Audio

- Music List (Ambient sound)
  - Electronic Trance music like the [![Riddle School OST](https://i.ytimg.com/vi/qTSGnjoQA2A/hqdefault.jpg?sqp=-oaymwExCNACELwBSFryq4qpAyMIARUAAIhCGAHwAQH4Af4JgALQBYoCDAgAEAEYYiBiKGIwDw==&rs=AOn4CLAQ4JtrquOvC2llCpZjTLp4a3dwqA)](https://www.youtube.com/playlist?list=PLG_KWhLq4Z4uEGxumMQ4yoewTcExIV3nh)
 
- Sound List (SFX)
  - All of these sounds would need to be folied at a later date
  - Equip Item
  - Move
  - Complete Puzzle
  - Open/Close Door
  - Use Key
  - Zoom In
  - Combine Item
  - Use Item
  - Move/Push item

# Metadata

* Template created by Austin Cory Bart <acbart@udel.edu>, Mark Sheriff, Alec Markarian, and Benjamin Stanley.
* Version 0.0.3
