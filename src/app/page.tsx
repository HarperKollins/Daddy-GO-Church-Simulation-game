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

// Data
const allEvents: GameEvent[] = ALL_EVENTS;

export default function GamePage() {
  const store = useGameStore();
  const {
    week, stats, assets, church, partner,
    advanceWeek, applyEffects, modifyStat,
    addMembers, upgradeVenue, addAsset, removeAsset,
    setPartner, setPlayerName, spendEnergy,
    startDating, propose, marry, breakup, hookup,
    upgradeSkill, trainSkill, uploadSermon, skills,
    dropout, resetGame, setOnboardingComplete
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

  // Init
  useEffect(() => { setIsClient(true); }, []);

  // Onboarding Trigger
  useEffect(() => {
    if (isClient && !store.hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, [isClient, store.hasCompletedOnboarding]);

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
      handleAdvanceWeek();
      return;
    }

    if (action.energyCost > 0 && stats.energy < action.energyCost) {
      addToast("Not enough energy!", "danger");
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
        spendEnergy(action.energyCost);
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

    // Spend energy first
    if (action.energyCost > 0) {
      spendEnergy(action.energyCost);
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
  const handleAdvanceWeek = () => {
    advanceWeek();
    checkForEvents();
    addToast(`Week ${week + 1} Started`, 'info');
  };

  if (!isClient) return null;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0f',
      paddingBottom: '80px',
    }}>
      {/* Stats Header */}
      <StatsBar onSettingsClick={() => setShowSettings(true)} />

      {/* Main Content Area - Tab-based */}
      <main style={{ minHeight: 'calc(100vh - 200px)' }}>
        {/* Home Tab - Action Menu */}
        {activeTab === 'home' && (
          <ActionMenu onAction={handleMenuAction} />
        )}

        {/* Church Tab - Skills & Training */}
        {activeTab === 'altar' && (
          <div style={{ padding: '16px' }}>
            <h2 style={{ color: '#e0e0e0', marginBottom: '16px', fontSize: '18px' }}>⛪ Church Management</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => setShowSkills(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '16px', background: '#111118', border: 'none',
                  borderRadius: '12px', cursor: 'pointer', textAlign: 'left'
                }}
              >
                <span style={{ fontSize: '24px' }}>📚</span>
                <div>
                  <div style={{ color: '#e0e0e0', fontWeight: 700 }}>Train Skills</div>
                  <div style={{ color: '#6b7280', fontSize: '12px' }}>Improve your pastoral abilities</div>
                </div>
              </button>
              <button
                onClick={() => setShowMinisters(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '16px', background: '#111118', border: 'none',
                  borderRadius: '12px', cursor: 'pointer', textAlign: 'left'
                }}
              >
                <span style={{ fontSize: '24px' }}>🎤</span>
                <div>
                  <div style={{ color: '#e0e0e0', fontWeight: 700 }}>Guest Ministers</div>
                  <div style={{ color: '#6b7280', fontSize: '12px' }}>Book famous pastors to preach</div>
                </div>
              </button>
              <button
                onClick={() => setShowWarfare(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '16px', background: '#111118', border: 'none',
                  borderRadius: '12px', cursor: 'pointer', textAlign: 'left'
                }}
              >
                <span style={{ fontSize: '24px' }}>⚔️</span>
                <div>
                  <div style={{ color: '#e0e0e0', fontWeight: 700 }}>Spiritual Warfare</div>
                  <div style={{ color: '#6b7280', fontSize: '12px' }}>Fight spiritual battles</div>
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
          <div style={{ padding: '16px' }}>
            <h2 style={{ color: '#e0e0e0', marginBottom: '16px', fontSize: '18px' }}>📱 Social & Relationships</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => setShowRelationships(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '16px', background: '#111118', border: 'none',
                  borderRadius: '12px', cursor: 'pointer', textAlign: 'left'
                }}
              >
                <span style={{ fontSize: '24px' }}>❤️</span>
                <div>
                  <div style={{ color: '#e0e0e0', fontWeight: 700 }}>Relationships</div>
                  <div style={{ color: '#6b7280', fontSize: '12px' }}>Dating, marriage, hookups</div>
                </div>
              </button>
              <button
                onClick={() => setShowSocial(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '16px', background: '#111118', border: 'none',
                  borderRadius: '12px', cursor: 'pointer', textAlign: 'left'
                }}
              >
                <span style={{ fontSize: '24px' }}>📺</span>
                <div>
                  <div style={{ color: '#e0e0e0', fontWeight: 700 }}>Social Media</div>
                  <div style={{ color: '#6b7280', fontSize: '12px' }}>YouTube, Spotify presence</div>
                </div>
              </button>
              <button
                onClick={() => setShowSiphon(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: '12px', cursor: 'pointer', textAlign: 'left'
                }}
              >
                <span style={{ fontSize: '24px' }}>💸</span>
                <div>
                  <div style={{ color: '#ef4444', fontWeight: 700 }}>Siphon Funds</div>
                  <div style={{ color: '#6b7280', fontSize: '12px' }}>Transfer church money (risky!)</div>
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
      {showOnboarding && <OnboardingFlow onComplete={(data) => {
        setPlayerName(data.name);
        setOnboardingComplete();
        setShowOnboarding(false);
        addToast(`Welcome, ${data.name}!`, 'success');
      }} />}

      {/* Dashboards */}
      {showCrypto && <CryptoDashboard onClose={() => setShowCrypto(false)} />}
      {showWarfare && <SpiritualWarfareModal onClose={() => setShowWarfare(false)} />}
      {showTestimony && <TestimonyManager onClose={() => setShowTestimony(false)} />}
      {showAssets && <AssetsModal />}
      {showMinisters && <GuestMinistersModal
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
      {showSettings && <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />}
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
            const result = hookup(type);
            if (result.pregnant) {
              addToast(`${result.mamaName} is pregnant with ${result.babyName}! 😱`, 'danger');
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
        <div className="modal-overlay" onClick={() => setShowSkills(false)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '16px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowSkills(false)}
                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}
              >×</button>
            </div>
            <SkillsModal />
          </div>
        </div>
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
