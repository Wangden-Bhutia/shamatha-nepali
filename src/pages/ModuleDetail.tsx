      <div className="max-w-lg mx-auto flex items-center gap-3 px-4 py-3">

        <button
          onClick={handleBack}
          className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>

        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground font-body tracking-wider uppercase">
            चरण {module.id}
          </p>
          <h1 className="font-display text-lg font-semibold text-foreground truncate">
            {module.title}
          </h1>
        </div>

      </div>

      <div className="max-w-lg mx-auto flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-3 text-sm font-body tracking-wider uppercase transition-colors relative ${
              activeTab === tab.key
                ? "text-gold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}

            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gold rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  )}

  <div className={`max-w-lg mx-auto px-4 ${inMeditationMode ? "flex-1 flex flex-col items-center justify-center" : "py-8"}`}>

    {activeTab === "learn" && (
      <div className="animate-fade-up space-y-6">

        {screens && totalScreens > 0 ? (
          <>
            <div className="flex items-center justify-center gap-2 mb-2">
              {screens.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLearnPage(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === learnPage ? "bg-gold" : "bg-border"
                  }`}
                />
              ))}
            </div>

            <div className="rounded-xl bg-card border border-border p-6 min-h-[220px]">
              <h2 className="font-display text-xl text-gold mb-4">
                {screens[learnPage].title}
              </h2>

              <p className="font-body text-foreground/90 leading-relaxed text-[15px]">
                {screens[learnPage].body}
              </p>
            </div>

            <div className="flex items-center justify-between">

              <Button
                variant="outline"
                size="sm"
                onClick={() => setLearnPage((p) => Math.max(0, p - 1))}
                disabled={learnPage === 0}
                className="rounded-full border-border"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                पछाडि
              </Button>

              <span className="text-xs text-muted-foreground font-body">
                {learnPage + 1} / {totalScreens}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setLearnPage((p) => Math.min(totalScreens - 1, p + 1))}
                disabled={learnPage === totalScreens - 1}
                className="rounded-full border-border"
              >
                अगाडि
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>

            </div>
          </>
        ) : (
          <p className="font-body text-foreground/90 leading-relaxed text-[15px]">
            {module.explanation}
          </p>
        )}

        {progress.sessionsCompleted > 0 && (
          <div className="rounded-lg bg-secondary/50 border border-border p-4">
            <p className="text-sm text-muted-foreground font-body">
              तपाईंले यो अभ्यास {progress.sessionsCompleted} पटक गर्नुभएको छ, कुल {progress.totalMinutesMeditated} मिनेट।
            </p>
          </div>
        )}

      </div>
    )}

    {activeTab === "meditate" && (
      <div className="animate-fade-up space-y-6">
        <h2 className="font-display text-xl text-gold text-center mb-8">
          ध्यान निर्देशन
        </h2>

        <ol className="space-y-5">
          {module.guidedMeditation.map((step, i) => (
            <li key={i} className="flex gap-4">

              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center text-xs text-gold font-body">
                {i + 1}
              </span>

              <p className="font-body text-foreground/85 leading-relaxed text-[15px] pt-0.5">
                {step}
              </p>

            </li>
          ))}
        </ol>
      </div>
    )}

    {activeTab === "timer" && (
      <div className={`animate-fade-up ${inMeditationMode ? "space-y-12" : "space-y-8"}`}>

        <TimerDisplay
          secondsRemaining={timer.secondsRemaining}
          progress={timer.progress}
          isRunning={timer.isRunning}
        />

        <TimerControls
          isRunning={timer.isRunning}
          isPaused={timer.isPaused}
          duration={timer.duration}
          onSetDuration={timer.setDuration}
          onStart={handleStart}
          onPause={handlePause}
          onResume={handleResume}
          onStop={handleStop}
        />

        {!timer.isRunning && !timer.isPaused && (
          <p className="text-center text-xs text-muted-foreground font-body">
            चरण {module.id} को लागि सुझाव गरिएको समय: {module.defaultDuration} मिनेट
          </p>
        )}

      </div>
    )}

  </div>

  <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
    <DialogContent className="max-w-xs rounded-xl">

      <DialogHeader>

        <DialogTitle className="font-display text-lg text-center">
          ध्यान सत्र समाप्त गर्ने?
        </DialogTitle>

        <DialogDescription className="text-center text-sm text-muted-foreground">
          हालको सत्र सुरक्षित हुने छैन।
        </DialogDescription>

      </DialogHeader>

      <div className="flex flex-col gap-2 pt-2">

        <Button
          onClick={() => setShowExitDialog(false)}
          className="rounded-full bg-gold text-primary-foreground hover:bg-gold-soft font-body tracking-wider uppercase text-sm"
        >
          ध्यान जारी राख्नुहोस्
        </Button>

        <Button
          onClick={handleExitConfirm}
          variant="outline"
          className="rounded-full border-border font-body tracking-wider uppercase text-sm"
        >
          सत्र समाप्त गर्नुहोस्
        </Button>

      </div>

    </DialogContent>
  </Dialog>

</div>
