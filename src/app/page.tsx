/**
 * Daddy G.O. Simulator - Reverted UI Design
 * Dark theme matching reference screenshot
 */

'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { getAvailableChoices, getNextStoryEvent, rollForRandomEvent } from '@/engine/eventSystem';
import { ALL_EVENTS } from '@/data/events';
import type { GameEvent, EventChoice } from '@/types/game';

// Engine Integrations
import {
  processPendingConsequences,
  registerConsequence,
  addKarmaEntry,
  generateNearMiss,
  recordChoiceAndUpdatePersonality,
} from '@/engine';

// Components
import StatsBar from '@/components/StatsBar';
import BottomNav from '@/components/BottomNav';
import ActionMenu from '@/components/ActionMenu';
import EventModal from '@/components/EventModal';
import Toast, { ToastMessage } from '@/components/Toast';
import OnboardingFlow from '@/components/OnboardingFlow';
import StoryIntro from '@/components/StoryIntro';
import HowToPlayModal from '@/components/HowToPlayModal';
import DeathScreen from '@/components/DeathScreen';
import RealismOverlay from '@/components/RealismOverlay';
import NotificationCenter from '@/components/NotificationCenter';

// Dashboard Modals
import CryptoDashboard from '@/components/dashboards/CryptoDashboard';
import SpiritualWarfareModal from '@/components/dashboards/SpiritualWarfareModal';
import TestimonyManager from '@/components/dashboards/TestimonyManager';
import SettingsModal from '@/components/SettingsModal';
import AssetsModal from '@/components/AssetsModal';
import GuestMinistersModal from '@/components/GuestMinistersModal';
import SiphonModal from '@/components/SiphonModal';
import RelationshipsModal from '@/components/RelationshipsModal';
import SkillsModal from '@/components/SkillsModal';
import SocialMediaModal from '@/components/SocialMediaModal';
import GraduationModal from '@/components/GraduationModal';
import DropoutModal from '@/components/DropoutModal';
import FarbesModal from '@/components/FarbesModal';
import YearlyReportModal from '@/components/YearlyReportModal';
import GameOverModal from '@/components/GameOverModal';

// Data
const allEvents: GameEvent[] = ALL_EVENTS;

export default function GamePage() {
  const store = useGameStore();
  const {
    week, stats, assets, church, partner,
    advanceYear, applyEffects, modifyStat,
    addMembers, upgradeVenue, addAsset, removeAsset,
    setPartner, setPlayerName, spendEnergy,
    startDating, propose, marry, breakup, hookup,
    upgradeSkill, trainSkill, uploadSermon, skills,
    dropout, resetGame, setOnboardingComplete, setStoryIntroComplete,
    hasSeenStoryIntro, gamePhase
  } = store;

  // UI State
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'office' | 'altar' | 'store' | 'scandal'>('home');

  // Game State
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [availableChoices, setAvailableChoices] = useState<EventChoice[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modal States
  const [showSettings, setShowSettings] = useState(false);
  const [showCrypto, setShowCrypto] = useState(false);
  const [showWarfare, setShowWarfare] = useState(false);
  const [showTestimony, setShowTestimony] = useState(false);
  const [showSiphon, setShowSiphon] = useState(false);
  const [showAssets, setShowAssets] = useState(false);
  const [showMinisters, setShowMinisters] = useState(false);
  const [showRelationships, setShowRelationships] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [showGraduation, setShowGraduation] = useState(false);
  const [showDropout, setShowDropout] = useState(false);
  const [showFarbes, setShowFarbes] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showStoryIntro, setShowStoryIntro] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  // Init
  useEffect(() => { setIsClient(true); }, []);

  // Story Intro & Onboarding Trigger
  useEffect(() => {
    if (isClient) {
      if (!hasSeenStoryIntro) {
        setShowStoryIntro(true);
      } else if (!store.hasCompletedOnboarding) {
        setShowOnboarding(true);
      }
    }
  }, [isClient, hasSeenStoryIntro, store.hasCompletedOnboarding]);

  // Initial Event Trigger (Week 1)
  useEffect(() => {
    if (isClient && week === 1 && store.hasCompletedOnboarding) {
      const introEvent = allEvents.find(e => e.id === 'BUS_STOP_MORNING_CRY' && !store.hasTriggeredEvent(e.id));
      if (introEvent) triggerEvent(introEvent);
    }
  }, [isClient, week, store.hasCompletedOnboarding]);

  // Toast Helper
  const addToast = (message: string, type: 'success' | 'warning' | 'danger' | 'info' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, text: message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };
  const removeToast = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  // Event Checking Logic
  const checkForEvents = () => {
    // 1. Story
    const storyEvent = getNextStoryEvent(allEvents, store);
    if (storyEvent) {
      triggerEvent(storyEvent);
      store.markEventTriggered(storyEvent.id);
      return;
    }
    // 2. Random
    if (Math.random() < 0.35) {
      const randomEvt = rollForRandomEvent(allEvents, store, 1.0);
      if (randomEvt) {
        triggerEvent(randomEvt);
        if (randomEvt.oneTime) store.markEventTriggered(randomEvt.id);
      }
    }
  };

  const triggerEvent = (event: GameEvent) => {
    setCurrentEvent(event);
    setAvailableChoices(getAvailableChoices(event, store));
  };

  const handleChoiceSelect = (choice: EventChoice) => {
    store.recordChoice(currentEvent!.id, choice.id);

    if (choice.effects) {
      choice.effects.forEach((effect: any) => {
        if (effect.type === 'stat' && effect.operation !== 'multiply') {
          modifyStat(effect.stat, effect.operation === 'subtract' ? -effect.value : effect.value);
        } else if (effect.type === 'members') {
          addMembers(effect.operation === 'subtract' ? -effect.value : effect.value);
        }
      });
    }

    addToast('Choice recorded.', 'info');
    setCurrentEvent(null);
  };

  // Action Handler from Menu
  const handleMenuAction = (action: any) => {
    // Handle week advance
    if (action.id === 'advance_week') {
      handleAdvanceYear();
      return;
    }



    // Handle specific actions
    if (action.id === 'invest') {
      setShowAssets(true);
      addToast("Opening Assets Manager...", "info");
      return;
    }

    if (action.id === 'date') {
      if (partner) {
        modifyStat('stress', -20);
        addToast(`Went on a date with ${partner.name}! ❤️`, 'success');
      } else {
        setShowRelationships(true);
        addToast("Looking for love...", "info");
      }
      return;
    }

    if (action.id === 'upgrade_venue') {
      // Show venue upgrade requirements
      const venueCosts: Record<string, number> = {
        'BUS_STOP': 50000,
        'CLASSROOM': 200000,
        'TENT': 500000,
        'WAREHOUSE': 2000000,
        'DOME': 10000000,
        'STADIUM': 50000000,
      };
      const nextVenues: Record<string, string> = {
        'BUS_STOP': 'CLASSROOM',
        'CLASSROOM': 'TENT',
        'TENT': 'WAREHOUSE',
        'WAREHOUSE': 'DOME',
        'DOME': 'STADIUM',
        'STADIUM': 'CITY_STATE',
      };

      const currentVenue = church.venue;
      const nextVenue = nextVenues[currentVenue];
      const cost = venueCosts[currentVenue] || 100000000;

      if (!nextVenue) {
        addToast("You have the biggest venue!", "info");
        return;
      }

      if (stats.churchCash >= cost) {
        modifyStat('churchCash', -cost);
        upgradeVenue(nextVenue as any);
        addToast(`Upgraded to ${nextVenue}! 🏛️`, 'success');
      } else {
        addToast(`Need ₦${cost.toLocaleString()} church cash to upgrade`, 'warning');
      }
      return;
    }



    // Apply immediate effects
    if (action.effects) {
      Object.entries(action.effects).forEach(([key, value]) => {
        if (typeof value === 'number') {
          if (key === 'members') addMembers(value);
          else modifyStat(key as any, value);
        }
      });
    }

    // Show appropriate toast based on action
    const actionMessages: Record<string, string> = {
      'preach': '🎤 Preached the Word! Gained members.',
      'sunday_service': '⛪ Sunday Service completed! Major boost!',
      'pray': '🙏 Deep prayer session complete. Anointing increased!',
      'bible_study': '📖 Bible Study done. Wisdom gained!',
      'crusade': '🎤 Street Crusade! Many souls reached!',
      'rest': '😴 Well rested! Health and energy restored.',
      'gym': '💪 Great workout! Health improved.',
    };

    addToast(actionMessages[action.id] || `${action.title || action.id} completed!`, 'success');
    checkForEvents();
  };

  // Week Advance
  const handleAdvanceYear = () => {
    advanceYear();
    checkForEvents();
    addToast(`Year ${2026 + Math.floor(week / 52)} Started`, 'info');
  };

  // ...
  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-app pb-20 max-w-md mx-auto relative shadow-2xl overflow-hidden border-x border-border-subtle">
      {/* Stats Header */}
      <StatsBar onSettingsClick={() => setShowSettings(true)} />

      {/* Main Content Area - Tab-based */}
      <main className="min-h-[calc(100vh-200px)] p-4 space-y-4">

        {/* Home Tab - Action Menu */}
        {activeTab === 'home' && (
          <ActionMenu onAction={handleMenuAction} />
        )}

        {/* Church Tab - Skills & Training */}
        {activeTab === 'altar' && (
          <div className="p-4">
            <h2 className="text-lg font-bold text-text-primary mb-4">⛪ Church Management</h2>
            <div className="flex flex-col gap-3">
              <button onClick={() => setShowSkills(true)} className="text-left group outline-none">
                <div className="p-4 bg-surface border border-border-subtle rounded-xl flex items-center gap-4 transition-all hover:bg-surface-hover hover:border-brand/50 hover:shadow-lg group-active:scale-95">
                  <span className="text-2xl bg-brand/10 w-12 h-12 rounded-full flex items-center justify-center">📚</span>
                  <div>
                    <div className="text-text-primary font-bold">Train Skills</div>
                    <div className="text-text-secondary text-xs">Improve your pastoral abilities</div>
                  </div>
                </div>
              </button>

              <button onClick={() => setShowMinisters(true)} className="text-left group outline-none">
                <div className="p-4 bg-surface border border-border-subtle rounded-xl flex items-center gap-4 transition-all hover:bg-surface-hover hover:border-brand/50 hover:shadow-lg group-active:scale-95">
                  <span className="text-2xl bg-amber-500/10 w-12 h-12 rounded-full flex items-center justify-center">🎤</span>
                  <div>
                    <div className="text-text-primary font-bold">Guest Ministers</div>
                    <div className="text-text-secondary text-xs">Book famous pastors to preach</div>
                  </div>
                </div>
              </button>

              <button onClick={() => setShowWarfare(true)} className="text-left group outline-none">
                <div className="p-4 bg-surface border border-border-subtle rounded-xl flex items-center gap-4 transition-all hover:bg-surface-hover hover:border-brand/50 hover:shadow-lg group-active:scale-95">
                  <span className="text-2xl bg-red-500/10 w-12 h-12 rounded-full flex items-center justify-center">⚔️</span>
                  <div>
                    <div className="text-text-primary font-bold">Spiritual Warfare</div>
                    <div className="text-text-secondary text-xs">Fight spiritual battles</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Assets Tab */}
        {activeTab === 'office' && (
          <AssetsModal />
        )}

        {/* Social Tab */}
        {activeTab === 'scandal' && (
          <div className="p-4">
            <h2 className="text-lg font-bold text-text-primary mb-4">📱 Social & Relationships</h2>
            <div className="flex flex-col gap-3">
              <button onClick={() => setShowRelationships(true)} className="text-left group outline-none">
                <div className="p-4 bg-surface border border-border-subtle rounded-xl flex items-center gap-4 transition-all hover:bg-surface-hover hover:border-brand/50 hover:shadow-lg group-active:scale-95">
                  <span className="text-2xl bg-pink-500/10 w-12 h-12 rounded-full flex items-center justify-center">❤️</span>
                  <div>
                    <div className="text-text-primary font-bold">Relationships</div>
                    <div className="text-text-secondary text-xs">Dating, marriage, hookups</div>
                  </div>
                </div>
              </button>

              <button onClick={() => setShowSocial(true)} className="text-left group outline-none">
                <div className="p-4 bg-surface border border-border-subtle rounded-xl flex items-center gap-4 transition-all hover:bg-surface-hover hover:border-brand/50 hover:shadow-lg group-active:scale-95">
                  <span className="text-2xl bg-blue-500/10 w-12 h-12 rounded-full flex items-center justify-center">📺</span>
                  <div>
                    <div className="text-text-primary font-bold">Social Media</div>
                    <div className="text-text-secondary text-xs">YouTube, Spotify presence</div>
                  </div>
                </div>
              </button>

              <button onClick={() => setShowSiphon(true)} className="text-left group outline-none">
                <div className="p-4 bg-danger/5 border border-danger/20 rounded-xl flex items-center gap-4 transition-all hover:bg-danger/10 hover:border-danger/40 hover:shadow-lg group-active:scale-95">
                  <span className="text-2xl bg-danger/10 w-12 h-12 rounded-full flex items-center justify-center text-danger">💸</span>
                  <div>
                    <div className="text-danger font-bold">Siphon Funds</div>
                    <div className="text-text-secondary text-xs">Transfer church money (risky!)</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Event Modal */}
      {currentEvent && (
        <EventModal
          event={currentEvent}
          availableChoices={availableChoices}
          onChoiceSelect={handleChoiceSelect}
        />
      )}

      {/* Onboarding */}
      {showStoryIntro && (
        <StoryIntro onComplete={() => {
          setStoryIntroComplete();
          setShowStoryIntro(false);
          // Onboarding will trigger via useEffect when hasSeenStoryIntro becomes true
        }} />
      )}

      {showOnboarding && <OnboardingFlow onComplete={(data) => {
        setPlayerName(data.name);
        setOnboardingComplete();
        setShowOnboarding(false);
        addToast(`Welcome, ${data.name}!`, 'success');
      }} />}

      {showHowToPlay && (
        <HowToPlayModal
          isOpen={showHowToPlay}
          onClose={() => setShowHowToPlay(false)}
        />
      )}

      {/* Dashboards */}
      {gamePhase === 'YEARLY_REPORT' && <YearlyReportModal />}
      {gamePhase === 'GAME_OVER' && <GameOverModal />}
      {showCrypto && <CryptoDashboard onClose={() => setShowCrypto(false)} />}
      {showWarfare && <SpiritualWarfareModal onClose={() => setShowWarfare(false)} />}
      {showTestimony && <TestimonyManager onClose={() => setShowTestimony(false)} />}
      {showAssets && <AssetsModal />}
      {showMinisters && <GuestMinistersModal
        isOpen={showMinisters}
        currentVenue={church.venue}
        churchCash={stats.churchCash}
        onBook={(minister) => {
          const cost = minister.costToBook || 0;
          if (stats.churchCash >= cost) {
            modifyStat('churchCash', -cost);
            addToast(`Booked ${minister.name}`, 'success');
            setShowMinisters(false);
          } else {
            addToast("Insufficient Funds", "danger");
          }
        }}
        onClose={() => setShowMinisters(false)}
      />}
      {showSiphon && <SiphonModal
        churchCash={stats.churchCash}
        personalCash={stats.personalCash}
        onSiphon={(amount, scandalRisk) => {
          modifyStat('churchCash', -amount);
          modifyStat('personalCash', amount);
          modifyStat('scandal', scandalRisk * 100);
          addToast(`Transferred ₦${amount.toLocaleString()}`, 'warning');
          setShowSiphon(false);
        }}
        onClose={() => setShowSiphon(false)}
      />}
      {showSettings && (
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          onHowToPlay={() => setShowHowToPlay(true)}
        />
      )}
      {showSocial && (
        <SocialMediaModal
          isOpen={showSocial}
          onClose={() => setShowSocial(false)}
          onUploadSermon={() => {
            uploadSermon();
            addToast("Sermon uploaded!", "success");
          }}
        />
      )}
      {showRelationships && (
        <RelationshipsModal
          onStartDating={(partner) => {
            startDating(partner);
            addToast(`Started dating ${partner.name}! ❤️`, 'success');
            setShowRelationships(false);
          }}
          onPropose={() => {
            propose();
            addToast('You proposed! 💍', 'success');
            setShowRelationships(false);
          }}
          onMarry={() => {
            marry();
            addToast('Congratulations! You are now married! 🎊', 'success');
            setShowRelationships(false);
          }}
          onBreakup={() => {
            breakup();
            addToast('Relationship ended 💔', 'warning');
            setShowRelationships(false);
          }}
          onHookup={(type) => {
            // @ts-ignore - Dynamic return type update
            const result = hookup(type);

            if (result.pregnant) {
              addToast(`${result.mamaName} is pregnant with ${result.babyName}! 😱`, 'danger');
            } else if (result.std) {
              addToast('Use protection! You contracted an infection. 🦠', 'danger');
            } else if (result.spiritSpouse) {
              addToast('Spiritual Attack! A Marine Spirit followed you home. 🧜‍♀️', 'danger');
            } else {
              addToast('Hookup successful... scandal risk increased', 'warning');
            }

            modifyStat('scandal', result.scandal);
            setShowRelationships(false);
          }}
          onClose={() => setShowRelationships(false)}
        />
      )}
      {showSkills && (
        <SkillsModal
          isOpen={showSkills}
          onClose={() => setShowSkills(false)}
        />
      )}
      <DropoutModal
        isOpen={showDropout}
        onConfirm={() => {
          dropout();
          addToast('You dropped out of university!', 'warning');
          setShowDropout(false);
        }}
        onCancel={() => setShowDropout(false)}
      />

      {/* System Overlays */}
      <Toast messages={toasts} onDismiss={removeToast} />
      <RealismOverlay />
      <DeathScreen
        playerName={store.name}
        age={store.age}
        weeksPlayed={store.week}
        deathCause={store.stats.health <= 0 ? "health" : "old_age"}
        stats={{
          fame: store.stats.fame,
          anointing: store.stats.anointing,
          members: store.church.members,
          personalCash: store.stats.personalCash,
          churchCash: store.stats.churchCash,
        }}
        ribbons={[]}
        timeline={[]}
        onRestart={resetGame}
        isAlive={store.isAlive}
      />
      <NotificationCenter />
    </div>
  );
}
