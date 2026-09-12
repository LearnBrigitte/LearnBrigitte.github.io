export const kit = [
    {
        name: "Brigitte",
        type: "Hero Stats",
        health: 175,
        armor: 75,
        health_regeneration_delay: "6 seconds",
        health_regeneration_over_time: "22.5 per second",
        melee_damage: 45,
        moves_speed: "5.5 meters per second",
        healing_reduction_from_damage_dealt: "-30% healing",
        tags: ["ARMOR"]
    },
    {
        name: "Sub-Role: Survivor",
        type: "Passive Ability",
        description: "Movement abilities start passive health regeneration.",
        duration: "0.25 seconds (minimum)",
    },
    {
        name: "Inspire",
        type: "Passive Ability",
        description: "Dealing damage to enemies heals nearby allies.",
        instant_healing: "12 (heal), 1.3 second (cooldown)",
        total_healing_over_time: 45,
        radius: "20 meters",
        duration: "4 seconds",
        tags: ["AREA OF EFFECT"]
    },
    {
        name: "Rocket Flail",
        type: "Primary Weapon",
        description: "A melee weapon with extended range.",
        damage: 45,
        ammo: "Unlimited",
        range: "6 meters",
        tags: ["MELEE"]
    },
    {
        name: "Repair Pack",
        type: "Ability",
        description: "Heals an ally for a short duration.",
        cooldown: "5 seconds",
        instant_healing: 25,
        total_healing_over_time: 100,
        range: "25 meters",
        effect_duration: "2 seconds",
        charges: 3,
        tags: ["IGNORE BARRIER", "STRONG PROJECTILE"]
    },
    {
        name: "Whip Shot",
        type: "Ability",
        description: "Launch your flail forward to knock an enemy away from you.",
        cooldown: "4 seconds",
        damage: 70,
        range: "20 meters",
        knockback: "25 meters per second",
        tags: ["EXTENDED MELEE"]
    },
    {
        name: "Barrier Shield",
        type: "Secondary Weapon",
        description: "Hold Seconday Fire to deploy a frontal energy barrier.",
        health: 300,
        barrier_recharge_rate: "85 per second",
        barrier_destroyed_cooldown: "5 seconds",
        movement_speed_penalty_on_self: "-30% move speed",
        tags: ["BARRIER", "CHANNEL", "DEPLOYABLE"]
    },
    {
        name: "Shield Bash",
        type: "Ability",
        description: "Available when Barrier Shield is deployed. Dash forward to knock back an enemy.",
        cooldown: "5 seconds",
        damage: 70,
        knockback: "6 meters per second",
        move_speed: "400% move speed",
        tags: ["BARRIER PIERCING", "COLLIDE", "MOVEMENT"]
    },
    {
        name: "Rally",
        type: "Ultimate Ability",
        description: "Grant armor, empower Barrier Shield, and provide extra health to nearby allies.",
        bonus_armor: "100 (self)",
        barrier_health_bonus: 450,
        duration: "10 seconds",
        radius: "8 meters",
        allied_overhealth: "100 (max), 30 per second, 30 seconds (decay delay)",
        bash_stun_duration: "0.75 seconds",
        move_speed_bonus: "15% move speed",
        tags: ["AREA OF EFFECT", "ARMOR", "OVERHEALTH", "STUN", "TRANSFORMATION"]
    }
];

export const AbilityTags = [
    {
        name: "MELEE",
        description: "A short range physical attack that can hit multiple enemies. Pierces Barriers and Negate Projectile. Blocked by Ignore Melee Abilities."
    },
    {
        name: "AREA OF EFFECT",
        description: "Affects targets in a spherical area."
    },
    {
        name: "ARMOR",
        description: "Health that reduces damage by 7 if greater than or equal to 14. Reduces damage below 14 by 50%. Reduces Beam damage by 30%."
    },
    {
        name: "OVERHEALTH",
        description: "This ability grants additional health that cannot be healed and gives enemies 50% less ultimate charge when damaged."
    },
    {
        name: "STUN",
        description: "Prevents a hero from taking actions, interrupts Channel abilities and is removed by Greater Cleanse."
    },
    {
        name: "TRANSFORMATION",
        description: "An alternate state with unique functionality that is not ended prematurely by Displace, Hacked, Sleep, or Stun."
    },
    {
        name: "IGNORE BARRIER",
        description: "Casting this ability on allies is not blocked by Barriers or heros."
    },
    {
        name: "STRONG PROJECTILE",
        description: "A projectile that cannot be Negated."
    },
    {
        name: "EXTENDED MELEE",
        description: "Melee attacks with travel time that are blocked by Barriers and Ignore Melee abilities."
    },
    {
        name: "BARRIER",
        description: "A physical construct with health that absorbes most ranged attacks and abilities but does not block hero movement. Pierced by Melee."
    },
    {
        name: "CHANNEL",
        description: "A continuous action that ends prematurely when interrupted by Displace, Hacked, Sleep, or Stun."
    },
    {
        name: "DEPLOYABLE",
        description: "A non-player entity with a unique health pool."
    },
    {
        name: "BARRIER PIERCING",
        description: "Pierces Barriers."
    },
    {
        name: "COLLIDE",
        description: "When two abilities with this property clash both heros suffer Knockdown."
    },
    {
        name: "MOVEMENT",
        description: "Silenced by Hinder. Grants the hero enhanced movement and ends prematurely when interrupted by Displace, Hacked, Sleep, or Stun."
    }
]

export const Perks = [
    {
        name: "Combat Medic",
        description: "Melee attacks against enemies reduce the cooldown of Repair Pack by 0.75 seconds.",
        type: "Minor",
        pick_rate: "20%"
    },
    {
        name: "Morale Boost",
        description: "Inspire lasts 3 seconds longer when activated by Whip Shot.",
        type: "Minor",
        pick_rate: "80%"
    },
    {
        name: "Inspiring Strike",
        description: "Shield Bash grants 30% increased movement speed for 2 seconds. Inspire's healing is instant when activated by Shield Bash.",
        type: "Major",
        pick_rate: "87%"
    },
    {
        name: "Whiplash",
        description: "Whip Shot's knockback can slam enemies into walls, dealing 60 extra damage.",
        type: "Major",
        pick_rate: "13%"
    }
]

export const Removed = [
    {
        name: "Barrier Restoration",
        description: "Shield Bash grants 30% movement speed for 1.5 seconds and bashing an enemy restores 100 Barrier health.",
        type: "Minor",
        removed_season: "Season 18"
    },
    {
        name: "Quick Fix",
        description: "Repair Packs instantly heal  an additional 35 health to critical health allies.",
        type: "Major",
        removed_season: "Season 18"
    }
]