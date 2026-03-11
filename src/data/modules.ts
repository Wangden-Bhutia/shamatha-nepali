export interface LearnScreen {
  title: string;
  body: string;
}

export type Level = "beginner" | "intermediate" | "advanced";

export interface MeditationModule {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  level: Level;
  explanation: string;
  learnScreens?: LearnScreen[];
  guidedMeditation: string[];
  defaultDuration: number;
}

export const levels: { key: Level; label: string; description: string }[] = [
  { key: "beginner", label: "Beginner", description: "Building the foundation of attention" },
  { key: "intermediate", label: "Intermediate", description: "Deepening stability and clarity" },
  { key: "advanced", label: "Advanced", description: "Resting in effortless awareness" },
];

export const modules: MeditationModule[] = [
  // ─── BEGINNER ───────────────────────────────────────────
  {
    id: 1,
    title: "Placing the Mind",
    subtitle: "Learning to rest attention on the breath",
    icon: "Wind",
    level: "beginner",
    explanation:
      "The practitioner begins learning to place attention on the breath. The mind wanders frequently and distractions are common.",
    learnScreens: [
      {
        title: "Starting the Journey",
        body: "Meditation begins with one simple task: placing your attention on the breath. This sounds easy but you will quickly discover how restless the mind is. Within seconds your attention will drift to thoughts, memories or plans. This is completely normal. Every meditator experiences this at the beginning. The practice is not about being perfectly focused. It is about noticing when your mind has wandered and gently bringing it back to the breath, again and again.",
      },
      {
        title: "Why the Breath?",
        body: "The breath is always available and always happening. It gives the mind a simple, natural anchor. You don't need to breathe in any special way — just notice the sensation of air flowing in and out. The breath is neutral enough that it doesn't excite or bore the mind. It simply gives your attention somewhere to rest. Over time this gentle resting trains the mind to become steadier and calmer.",
      },
      {
        title: "The Wandering Mind",
        body: "At this stage your mind will wander constantly. You might stay with the breath for only a few seconds before drifting into thought. Don't be discouraged — this is exactly how it works for everyone. Each time you notice you've wandered and bring attention back, you are strengthening your ability to be present. That moment of noticing is the most important part of the practice. Be patient and kind with yourself.",
      },
    ],
    guidedMeditation: [
      "Find a comfortable seat — on a cushion, chair, or anywhere you can sit upright without strain. Let your hands rest naturally on your knees or in your lap.",
      "Gently close your eyes or soften your gaze downward. Take three slow, deep breaths to let your body settle.",
      "Now allow your breathing to return to its natural rhythm. There is no need to control it.",
      "Bring your attention to the sensation of breath at your nostrils. Notice the cool air flowing in and the warm air flowing out.",
      "After a short while you will notice your mind has wandered. This is completely normal. Simply notice that you drifted and gently bring your attention back to the breath.",
      "Each time you notice and return is a moment of practice. Don't judge yourself — just come back gently.",
      "Continue resting with the breath for the remainder of your session. When thoughts come, let them pass. When you drift, return gently.",
    ],
    defaultDuration: 5,
  },
  {
    id: 2,
    title: "Continuous Placement",
    subtitle: "Sustaining attention a little longer",
    icon: "Anchor",
    level: "beginner",
    explanation:
      "Attention stays on the breath for slightly longer periods. Distractions still occur often, but the practitioner notices them more quickly.",
    learnScreens: [
      {
        title: "Staying a Little Longer",
        body: "In this stage you begin to sustain attention on the breath for slightly longer periods. Instead of drifting away after a few seconds, you may stay present for ten or twenty seconds at a time. This is real progress, even if it doesn't feel dramatic. The key is consistency — each time you return your attention, the mind learns to stay a little longer. Don't try to force concentration. Let it develop naturally through gentle repetition.",
      },
      {
        title: "Noticing Distractions Faster",
        body: "As you practice more, you begin to notice distractions sooner. Instead of getting lost in a long chain of thoughts before realizing you've drifted, you catch yourself earlier. This quicker recognition is a sign that your mindfulness is growing stronger. The gap between wandering and noticing gets shorter. Eventually returning to the breath becomes more natural and requires less effort.",
      },
      {
        title: "Building a Habit",
        body: "At this stage the most important thing is regular practice. Even short sessions of five to ten minutes build the habit of attention. Your mind is learning a new skill, and like any skill it improves with repetition. Don't worry about how well you're doing. Simply show up, sit, and practice. The consistency matters more than the quality of any single session. Trust the process.",
      },
    ],
    guidedMeditation: [
      "Settle into your seated position. Let your body relax and your shoulders drop.",
      "Close your eyes gently. Take three deep breaths, then let breathing become natural.",
      "Place your attention on the breath at the nostrils. Feel each inhale and each exhale.",
      "Try to stay with the breath continuously. Follow the full length of each in-breath and out-breath.",
      "When you notice your mind has wandered, recognize it calmly and return to the breath without frustration.",
      "See if you can stay with two or three breaths in a row before the mind wanders. Don't strain — just gently sustain your attention.",
      "Continue this gentle practice of staying and returning for the rest of the session.",
    ],
    defaultDuration: 7,
  },
  {
    id: 3,
    title: "Repeated Placement",
    subtitle: "Catching distractions as they arise",
    icon: "RefreshCw",
    level: "beginner",
    explanation:
      "The practitioner becomes more aware of distraction as it happens. Each time the mind wanders, it is gently returned to the breath.",
    learnScreens: [
      {
        title: "Awareness of Distraction",
        body: "By this stage you become more aware of the moment distraction happens. You start to notice the mind pulling away from the breath almost as it occurs. This is a significant development. Before, you might have been lost in thought for a long time before noticing. Now the gap is shorter. You are developing a kind of inner watchfulness that operates alongside your attention on the breath.",
      },
      {
        title: "The Rhythm of Return",
        body: "Practice at this stage develops a natural rhythm: rest on the breath, notice wandering, return gently. This cycle repeats many times in each session. Don't see wandering as failure — it is part of the practice. Each return strengthens your mindfulness. Over time the returns become quicker and smoother. The mind begins to settle more easily because it knows the way back.",
      },
      {
        title: "Strengthening Mindfulness",
        body: "Mindfulness is like a muscle that grows stronger with use. At this stage you are actively building that strength. Your awareness becomes more reliable and more consistent. You may notice that you can sit for longer periods without losing track of the breath entirely. Be encouraged by this progress but don't become attached to it. Simply continue practicing with patience and gentleness.",
      },
    ],
    guidedMeditation: [
      "Sit comfortably with your spine upright but relaxed. Let your hands rest naturally.",
      "Close your eyes and take a few settling breaths. Then let breathing become natural.",
      "Place attention on the breath. Feel the sensation at the nostrils or the gentle rise and fall of the chest.",
      "As you sit, notice when the mind begins to wander. Try to catch the distraction early — as it starts, not after you're already lost.",
      "Each time you notice, gently bring attention back. No frustration, no judgment. Just a calm return.",
      "Notice the rhythm: resting, wandering, noticing, returning. Let this rhythm become smooth and natural.",
      "Continue practicing this attentive cycle for the remainder of the session. Let each return be soft and patient.",
    ],
    defaultDuration: 10,
  },

  // ─── INTERMEDIATE ───────────────────────────────────────
  {
    id: 4,
    title: "Close Placement",
    subtitle: "Attention becomes naturally stable",
    icon: "Target",
    level: "intermediate",
    explanation:
      "Attention becomes more stable and distractions weaken. The meditator learns to maintain steady awareness while relaxing the effort.",
    learnScreens: [
      {
        title: "Settling Into Stability",
        body: "At this stage something shifts. Your attention no longer wanders as frequently or as far. When you place your mind on the breath, it tends to stay there more naturally. Distractions still arise but they have less power to pull you away. You may notice that you can sit through entire stretches of breathing without losing your focus. This is a sign that your practice is maturing and your mind is becoming more settled.",
      },
      {
        title: "Relaxing the Effort",
        body: "An important shift happens now: you begin to relax the effort you use to stay focused. In earlier stages you needed to actively bring attention back again and again. Now the mind stays more easily, so you can soften your grip. Holding too tightly actually creates tension. The practice becomes gentler — like balancing a feather on your palm rather than gripping a rope. Let attention rest lightly.",
      },
      {
        title: "Steady and Relaxed",
        body: "The ideal at this stage is attention that is both steady and relaxed. Not tight, not loose. Not forcing, not drifting. You are learning to find a middle ground where awareness is clear and present but the body and mind remain comfortable. This balance is the heart of shamatha practice. When you find it, meditation begins to feel more natural and even enjoyable.",
      },
    ],
    guidedMeditation: [
      "Settle into your posture. Let your body be relaxed but upright. Take a few deep breaths and release tension.",
      "Place your attention on the breath gently. Let it rest there like a leaf settling on water.",
      "Notice that attention stays more easily now. You don't need to chase it or force it back constantly.",
      "If a distraction arises, let it pass naturally. Don't engage with it — simply allow it to fade.",
      "Pay attention to the quality of your effort. If you notice tension or strain, soften. Let your focus be light and steady.",
      "Rest in this balance: present but relaxed, attentive but gentle.",
      "Continue for the remainder of the session, allowing attention to settle deeper with each breath.",
    ],
    defaultDuration: 12,
  },
  {
    id: 5,
    title: "Taming the Mind",
    subtitle: "Discovering clarity and calm",
    icon: "Sparkles",
    level: "intermediate",
    explanation:
      "The practitioner recognizes that meditation brings clarity and calmness. Attention becomes more controlled and stable.",
    learnScreens: [
      {
        title: "Clarity Emerges",
        body: "As your practice deepens, you begin to notice moments of genuine clarity. The mind feels bright and aware, not foggy or scattered. Thoughts may still arise, but they don't cloud your awareness. It is like the difference between looking through dirty glass and clean glass — the view is the same but everything appears sharper and more vivid. This clarity is a natural result of sustained practice.",
      },
      {
        title: "The Mind Becomes Calmer",
        body: "Along with clarity comes a growing sense of calmness. The usual restlessness and agitation begin to settle. You may notice that you feel more peaceful during and after meditation. This calmness is not something you create through force — it arises naturally when the mind stops chasing after every thought and sensation. You are beginning to experience the fruits of your patience and practice.",
      },
      {
        title: "Appreciating the Benefits",
        body: "At this stage it's natural to appreciate how meditation is changing your experience. You feel clearer, calmer and more grounded. However, the teachings advise not to become attached to these pleasant states. They are signs of progress but they will come and go. The practice is to continue sitting with steady, balanced awareness regardless of whether the experience feels special or ordinary.",
      },
    ],
    guidedMeditation: [
      "Find your comfortable seat and settle in. Let the body relax deeply.",
      "Breathe naturally. Place your attention on the breath with gentle, steady awareness.",
      "As you sit, notice the quality of your mind. Is there a sense of clarity or brightness? Simply observe it.",
      "Notice any calmness that is present. Don't try to create it or hold onto it — just recognize it.",
      "If thoughts arise, let them pass without engaging. Your attention naturally returns to the breath.",
      "Appreciate this growing stability without grasping at it. Simply continue sitting.",
      "Rest in this clear, calm awareness for the remainder of the session.",
    ],
    defaultDuration: 15,
  },
  {
    id: 6,
    title: "Pacifying the Mind",
    subtitle: "Balancing dullness and restlessness",
    icon: "Scale",
    level: "intermediate",
    explanation:
      "Subtle distractions such as dullness or restlessness are recognized and balanced. The mind becomes more balanced and calm.",
    learnScreens: [
      {
        title: "Subtle Obstacles",
        body: "At this stage, the obvious distractions have mostly settled. But subtler obstacles appear: dullness and restlessness. Dullness is when the mind becomes foggy, heavy, or sleepy during meditation. Restlessness is when a subtle undercurrent of agitation keeps the mind from fully settling. Both are normal experiences. Recognizing them is the first step to working with them skillfully.",
      },
      {
        title: "Working with Dullness",
        body: "When dullness arises, the mind feels heavy and unclear. You might feel drowsy or notice your awareness becoming vague. The remedy is to gently brighten your attention — sit up a little straighter, take a slightly deeper breath, or sharpen your focus on the breath sensations. You are not fighting the dullness, just gently lifting the mind back to clarity. A light, fresh quality of attention is what you're looking for.",
      },
      {
        title: "Working with Restlessness",
        body: "Restlessness shows up as subtle agitation or the feeling that you can't quite settle. The mind may feel jumpy even when no specific thoughts are pulling you away. The remedy is to relax — soften your focus slightly, let your body settle more deeply, and release any tension. Sometimes lowering your gaze or taking a few slower breaths helps. The goal is to find the middle ground between too tight and too loose.",
      },
    ],
    guidedMeditation: [
      "Settle into your posture. Take a few deep breaths and release any tension in the body.",
      "Place attention on the breath gently and let the mind settle.",
      "As you sit, begin to notice the quality of your attention. Is it clear or foggy? Steady or restless?",
      "If you notice dullness — heaviness, sleepiness, vagueness — gently brighten your attention. Sit up slightly, sharpen your focus.",
      "If you notice restlessness — agitation, jumpiness, subtle tension — soften your focus. Relax more deeply.",
      "Find the balance: clear but relaxed, steady but gentle. This middle ground is the heart of this practice.",
      "Continue adjusting gently throughout the session, always returning to balanced, clear awareness.",
    ],
    defaultDuration: 18,
  },

  // ─── ADVANCED ───────────────────────────────────────────
  {
    id: 7,
    title: "Fully Pacified Mind",
    subtitle: "Meditation becomes smooth and effortless",
    icon: "Mountain",
    level: "advanced",
    explanation:
      "The mind becomes highly stable and disturbances are minimal. Meditation becomes smoother and requires less effort.",
    learnScreens: [
      {
        title: "Deep Stability",
        body: "By this stage your mind has become deeply stable. Distractions still arise occasionally but they have very little power. They appear briefly and dissolve on their own without pulling you away from the breath. You no longer need to actively fight or manage distractions. The mind has learned to settle naturally. Meditation feels smoother and more effortless than it did in earlier stages.",
      },
      {
        title: "Less Effort, More Presence",
        body: "An important quality of this stage is that less effort is needed. In the beginning you had to work hard to stay with the breath. Now presence happens more naturally. The mind knows how to rest. You can ease up on effort without losing your focus. This is a sign of genuine progress — the skills you have been building are becoming part of how your mind naturally functions.",
      },
      {
        title: "Trusting the Process",
        body: "At this stage, trust your practice. You have put in the time and effort to reach this point. Don't complicate things by adding new techniques or striving for special experiences. Simply continue sitting with the same gentle awareness you have been cultivating all along. The mind will continue to deepen on its own. Your job is to show up and let the process unfold naturally.",
      },
    ],
    guidedMeditation: [
      "Settle into your seat with a sense of ease. Your body knows this posture well by now.",
      "Let breathing be completely natural. Place attention on the breath very lightly.",
      "Notice how the mind settles more quickly and easily. Allow this natural stability.",
      "If any distraction arises, it will likely dissolve on its own. No need to actively manage it.",
      "Let your effort be minimal. Just enough awareness to remain present, no more.",
      "Rest in this smooth, stable attention. Let it deepen naturally without pushing.",
      "Continue for the remainder of the session, trusting the mind to stay settled.",
    ],
    defaultDuration: 22,
  },
  {
    id: 8,
    title: "Single-Pointed Attention",
    subtitle: "The mind becomes clear and unified",
    icon: "Eye",
    level: "advanced",
    explanation:
      "Attention remains steadily on the object without significant distraction. The mind becomes clear and unified.",
    learnScreens: [
      {
        title: "Unwavering Focus",
        body: "At this stage your attention can remain on the breath for extended periods without significant distraction. The mind feels unified — all of your awareness is gathered in one place rather than scattered across different thoughts and sensations. This single-pointed quality brings a remarkable sense of clarity and stillness. The mind is fully present, fully engaged, and fully at rest all at the same time.",
      },
      {
        title: "Clarity and Stillness Together",
        body: "Single-pointed attention brings together two qualities that might seem opposite: clarity and stillness. The mind is very still, yet it is also very clear and bright. There is no dullness in the stillness and no agitation in the clarity. These two qualities support each other naturally. This is the hallmark of well-developed shamatha — a mind that is both perfectly calm and perfectly aware.",
      },
      {
        title: "Continuing with Humility",
        body: "Even at this advanced stage, the practice remains simple: sit, breathe, be present. Don't let achievement create pride or complacency. The mind can always deepen further. Continue with the same humble, patient attitude you brought to your very first session. The greatest practitioners are those who never stop being beginners at heart. Let each session be fresh and open.",
      },
    ],
    guidedMeditation: [
      "Take your seat with quiet confidence. Let the body settle completely.",
      "Let breathing be natural and effortless. There is nothing to control.",
      "Place attention on the breath and let it rest there steadily. No need to adjust or manage.",
      "Notice the unity of your awareness — everything gathered gently on this one point.",
      "The mind is still and clear. Rest in this natural single-pointedness.",
      "If any subtle movement arises, let it settle on its own. Don't intervene.",
      "Continue resting in this unified, clear awareness for the entire session.",
    ],
    defaultDuration: 25,
  },
  {
    id: 9,
    title: "Effortless Stability",
    subtitle: "Awareness rests in its own nature",
    icon: "Sun",
    level: "advanced",
    explanation:
      "Meditation becomes natural and effortless. Awareness remains stable and relaxed without continuous effort.",
    learnScreens: [
      {
        title: "Beyond Effort",
        body: "This is the culmination of shamatha practice. Meditation requires no effort at all. You sit down and awareness is simply present — stable, clear, and relaxed. There is no need to place attention anywhere or bring it back from anywhere. The mind naturally rests in its own stillness. All the training you have done has brought you to the point where the mind knows how to be at peace without being told.",
      },
      {
        title: "Natural Awareness",
        body: "Effortless stability means awareness is simply present on its own. You are not doing meditation — meditation is happening naturally. Thoughts may arise but they don't create any disturbance. They are like ripples on the surface of a deep, still lake. The depths remain undisturbed. This natural quality of awareness has always been present. Your practice has simply cleared away the habits that were hiding it.",
      },
      {
        title: "Resting in Stillness",
        body: "At this stage there is nothing more to achieve in shamatha practice. The mind has found its natural resting place. Continue to sit regularly, not because you need to improve, but because this natural stillness is worth returning to again and again. Let each session be a simple resting in what is already present. There is nothing to add and nothing to remove. Just awareness, resting in its own nature.",
      },
    ],
    guidedMeditation: [
      "Sit down and let everything settle. There is nothing you need to do.",
      "Let breathing happen on its own. Let attention rest wherever it naturally falls.",
      "Don't meditate. Don't try to focus. Don't try to achieve anything.",
      "Simply let awareness be present. It knows how to rest. Trust it.",
      "Thoughts may come and go. They require no response. Let everything be as it is.",
      "Rest in this effortless, natural stability. No effort, no technique, no goal.",
      "Continue resting for the entire session. Simply being, moment by moment, breath by breath.",
    ],
    defaultDuration: 30,
  },
];
