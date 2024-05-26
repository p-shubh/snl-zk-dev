#[allow(lint(public_random))]
module addrx::snl {
    use sui::url::{Self, Url};
    use std::string::{Self, String};
    use sui::object::{Self, ID, UID};
    use sui::event;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::random::{Self, Random, new_generator};
    //use std::debug;

    //==============================================================================================
    // Constants
    //==============================================================================================
    const NFT_DESC: vector<u8> = b"Sui Snakes & Ladder Game";
    //==============================================================================================
    // Structs 
    //==============================================================================================
 
    // struct State has key ,store {
    //     id: UID,
    //     player: address,
    // }

    struct SNL_NFT has key, store {
        id: UID,
        name: String,
        description: String,
        url: Url,
        isActive: bool,
        position: u8,
    }

    //==============================================================================================
    // Event Structs 
    //==============================================================================================
    struct NFTMinted has copy, drop {
        // The Object ID of the NFT
        object_id: ID,
        // The creator of the NFT
        creator: address,
        // The name of the NFT
        name: String,
        /// NFT Description
        description: String,
        ///NFT URL
        url: Url
    }

    struct GameWon has copy,drop {
        creator: address,
        game_won: bool,
    }

    struct DiceRolled has copy,drop {
        dice_value: u8,
        player_position: u8,
    }


    //==============================================================================================
    // Initialize the game 
    //==============================================================================================

    public entry fun initialize_game(nft_name: String, nft_url: String, ctx: &mut TxContext ) {
        let sender = tx_context::sender(ctx);
        let nft = SNL_NFT{
            id: object::new(ctx),
            name: nft_name,
            description: string::utf8(NFT_DESC),
            url: url::new_unsafe_from_bytes(*string::bytes(&nft_url)),
            isActive : true,
            position: 0,
        };

        event::emit(NFTMinted {
            object_id: object::id(&nft),
            creator: sender,
            name: nft.name,
            description: nft.description,
            url: nft.url,
        });
        transfer::public_transfer(nft,sender);
    }

    entry fun roll_dice(r: &Random, nft: &mut SNL_NFT , ctx: &mut TxContext): (u8,u8){
        let generator = new_generator(r, ctx); // generator is a PRG
        let dice = random::generate_u8_in_range(&mut generator, 1, 6);
        let player_pos : u8 =  move_player(dice ,nft);
        nft.position = player_pos;
        
        if(player_pos == 72){
            nft.isActive = false;
            event::emit(GameWon {
                creator:  tx_context::sender(ctx),
                game_won: true,
            });
        }
        else{
            event::emit(DiceRolled{
                dice_value: dice,
                player_position: player_pos,
            });
        };

        (dice,player_pos)
    } 

    // const ladderpoints =  [3, 12, 8, 16,  13, 22,  19, 30, 33, 52, 36, 44, 37, 47, 50,69, 54, 63];

    //   const snakepoints = [10,1, 27,9, 24, 15,31,23, 43, 26, 40, 30, 58, 39, 70, 51, 65, 55];

    fun move_player(dice_val: u8 ,nft:  &SNL_NFT): u8 {
        let pos =  nft.position;
        let next_pos = pos + dice_val;
        // Ladders
        if (next_pos == 3)   return 12; 
        if (next_pos == 8)   return 16; 
        if (next_pos == 13)  return 22; 
        if (next_pos == 19)  return 30; 
        if (next_pos == 33)  return 52; 
        if (next_pos == 36)  return 44; 
        if (next_pos == 37)  return 47; 
        if (next_pos == 50)  return 69; 
        if (next_pos == 54)  return 63; 
        //Snakes
        if (next_pos == 10) return 1; 
        if (next_pos == 27) return 9; 
        if (next_pos == 24) return 15; 
        if (next_pos == 31) return 23; 
        if (next_pos == 43) return 26; 
        if (next_pos == 40) return 30; 
        if (next_pos == 58) return 39; 
        if (next_pos == 70) return 51; 
        if (next_pos == 65) return 55; 

        next_pos
    } 

    public entry fun player_position(nft: &SNL_NFT): u8 {
        nft.position    
    }
}
