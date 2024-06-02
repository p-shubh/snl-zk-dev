// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract SNL is
    Context,
    AccessControl,
    ERC721,
    VRFConsumerBaseV2Plus
{
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant PLAYER_ROLE = keccak256("PLAYER_ROLE");

    uint256 private constant ROLL_IN_PROGRESS = 42;
    uint256 private constant ROLL_AVAILABLE = 43;

    address constant vrfCoordinator =
        0x7E10652Cb79Ba97bC1D0F38a1e8FaD8464a8a908;
    bytes32 constant s_keyHash =
        0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae;
    uint32 constant callbackGasLimit = 40000;
    uint16 constant requestConfirmations = 3;
    uint32 constant numWords = 1;

    uint256 s_subscriptionId;
    uint256 public nextTokenId;
    bool public gameStarted;

    mapping(uint256 => address) private s_rollers;
    mapping(address => Player) public tokendIdToPlayerInfo;
    mapping(uint256 => uint256) public laddersAndSnakes;

    struct Player {
        uint256 playerPos;
        uint256 diceStatus;
    }

    modifier onlyPlayer() {
        hasRole(PLAYER_ROLE, _msgSender());
        _;
    }

    event GameStarted(address player);
    event DiceRolled(uint256 indexed requestId, address indexed roller);
    event DiceLanded(uint256 indexed requestId, uint256 indexed result);
    event PlayerPositionInfo(address player, uint256 position);
    event GameWon(address winner);

    constructor(
        uint256 subscriptionId,
        address setupAdminRole,
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) VRFConsumerBaseV2Plus(vrfCoordinator) {
        s_subscriptionId = subscriptionId;
         _grantRole(ADMIN_ROLE, setupAdminRole);
        _setRoleAdmin(ADMIN_ROLE, ADMIN_ROLE);
        _setRoleAdmin(PLAYER_ROLE, ADMIN_ROLE);
        // Setting up ladders and Snakes
        // Setting up ladders
        laddersAndSnakes[3] = 12;
        laddersAndSnakes[8] = 16;
        laddersAndSnakes[13] = 22;
        laddersAndSnakes[19] = 30;
        laddersAndSnakes[33] = 52;
        laddersAndSnakes[36] = 44;
        laddersAndSnakes[37] = 47;
        laddersAndSnakes[50] = 69;
        laddersAndSnakes[54] = 63;
        // Setting up snakes
        laddersAndSnakes[10] = 1;
        laddersAndSnakes[27] = 9;
        laddersAndSnakes[24] = 15;
        laddersAndSnakes[31] = 23;
        laddersAndSnakes[43] = 26;
        laddersAndSnakes[40] = 30;
        laddersAndSnakes[58] = 39;
        laddersAndSnakes[70] = 51;
        laddersAndSnakes[65] = 55;
    }

    function startGame() external onlyPlayer {
        nextTokenId++;
        uint256 tokenId = nextTokenId;
        _safeMint(_msgSender(), tokenId);

        tokendIdToPlayerInfo[_msgSender()] = Player(0, ROLL_AVAILABLE);
        emit GameStarted(_msgSender());
    }

    function rollDice(uint256 _tokenId) public returns (uint256 requestId) {
        require(ownerOf(_tokenId) == _msgSender(), "Not token owner");
        require(
            tokendIdToPlayerInfo[_msgSender()].diceStatus == ROLL_AVAILABLE,
            "Already rolled"
        );
        // Will revert if subscription is not set and funded.
        requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: s_keyHash,
                subId: s_subscriptionId,
                requestConfirmations: requestConfirmations,
                callbackGasLimit: callbackGasLimit,
                numWords: numWords,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({nativePayment: false})
                )
            })
        );

        s_rollers[requestId] = _msgSender();
        tokendIdToPlayerInfo[_msgSender()].diceStatus = ROLL_IN_PROGRESS;
        emit DiceRolled(requestId, _msgSender());
    }

    // fulfillRandomWords function
    function fulfillRandomWords(
        uint256 requestId,
        uint256[] calldata randomWords
    ) internal override {
        // transform the result to a number between 1 and 6 inclusively
        uint256 d20Value = (randomWords[0] % 6) + 1;

        movePlayer(s_rollers[requestId], d20Value);

        tokendIdToPlayerInfo[s_rollers[requestId]].diceStatus = ROLL_AVAILABLE;
        // emitting event to signal that dice landed
        emit DiceLanded(requestId, d20Value);
    }

    function movePlayer(address player, uint256 steps) private {
        uint256 pos = snakeOrLadderPos(
            tokendIdToPlayerInfo[player].playerPos,
            steps
        );
        if (pos == 72) {
            emit GameWon(player);
        } else {
            emit PlayerPositionInfo(player, pos);
        }
    }

    function snakeOrLadderPos(
        uint256 playerposition,
        uint256 dicepos
    ) private view returns (uint256) {
        uint256 currentState = playerposition + dicepos;
        if (laddersAndSnakes[currentState] > 0) {
            return laddersAndSnakes[currentState];
        } else {
            return currentState;
        }
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(AccessControl, ERC721) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
