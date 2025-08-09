# Stage 1: Use the official Intel base image to ensure all XPU drivers are present.
FROM intel/deep-learning-essentials:2025.0.2-0-devel-ubuntu22.04 AS base

# Install essential system packages and Miniconda
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
    git \
    curl \
    libgl1 \
    wget && \
    rm -rf /var/lib/apt/lists/*

# Install Miniconda
RUN wget --quiet https://repo.anaconda.com/miniconda/Miniconda3-py311_23.11.0-2-Linux-x86_64.sh -O ~/miniconda.sh && \
    /bin/bash ~/miniconda.sh -b -p /opt/conda && \
    rm ~/miniconda.sh && \
    /opt/conda/bin/conda clean -tip && \
    ln -s /opt/conda/etc/profile.d/conda.sh /etc/profile.d/conda.sh && \
    echo ". /opt/conda/etc/profile.d/conda.sh" >> ~/.bashrc

# Set up the Conda environment
ENV PATH /opt/conda/bin:$PATH
WORKDIR /app

# Copy the environment file
COPY environment.yml .

# Create the Conda environment from the file
# This also installs the XPU-specific PyTorch packages using pip
RUN conda env create -f environment.yml && \
    echo "conda activate neurotrader_xpu" >> ~/.bashrc

# Set the entrypoint to use the Conda environment
SHELL ["conda", "run", "-n", "neurotrader_xpu", "/bin/bash", "-c"]

# --- Stage 2: Final Application Image ---
FROM base AS final

WORKDIR /app

# Copy the rest of your project files
COPY . .

# Expose ports for Django and Jupyter
EXPOSE 8000 8888

# Default command to start a bash session so you can run what you need
CMD ["/bin/bash"]
